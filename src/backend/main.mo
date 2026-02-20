import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Blob "mo:core/Blob";
import Runtime "mo:core/Runtime";
import Debug "mo:core/Debug";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

// Actor definition
actor {
  include MixinStorage();

  module Internal {
    public func initializeAndMigrateIfNeeded(emptyMap : Map.Map<Text, Nakshatra>) : Map.Map<Text, Nakshatra> {
      if (emptyMap.isEmpty()) {
        Debug.print("Migration seeding triggered!");
        let newMap = Migration.seedDataFromMigration();
        if (newMap.isEmpty()) {
          Debug.print("Migration seeding failed!");
        } else {
          Debug.print("Migration seeding successful. 27 Nakshatras loaded.");
        };
        return newMap;
      } else {
        return emptyMap;
      };
    };
  };

  // Types needed for persistent state system
  public type UserProfile = {
    name : Text;
  };

  public type PadaInfo = {
    title : Text;
    description : Text;
  };

  public type Nakshatra = {
    name : Text;
    imageId : ?Text;
    description : Text;
    rulingDeity : Text;
    symbol : Text;
    characteristics : Text;
    lunarClimate : Text;
    karmicLesson : Text;
    pada1 : PadaInfo;
    pada2 : PadaInfo;
    pada3 : PadaInfo;
    pada4 : PadaInfo;
  };

  // Persistent State
  let nakshatraMapInternal = Map.empty<Text, Nakshatra>();
  // Call initialization function to apply migration if storage is empty
  let nakshatraMap = Internal.initializeAndMigrateIfNeeded(nakshatraMapInternal);

  let userProfiles = Map.empty<Principal, UserProfile>();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  let imageStore = Map.empty<Text, Blob>();
  var nextImageId = 1;

  // User Profile System
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    validateAccess(#user, caller);
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    validateSelfOrAdmin(user, caller);
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    validateAccess(#user, caller);
    userProfiles.add(caller, profile);
  };

  // Nakshatra Operations
  public shared ({ caller }) func createNakshatra(nakshatra : Nakshatra) : async Bool {
    validateAccess(#admin, caller);
    nakshatraMap.add(nakshatra.name, nakshatra);
    true;
  };

  public shared ({ caller }) func updateNakshatra(nakshatra : Nakshatra) : async Bool {
    validateAccess(#user, caller);
    switch (nakshatraMap.get(nakshatra.name)) {
      case (null) { Runtime.trap("Nakshatra not found") };
      case (?existingNakshatra) {
        let updatedNakshatra : Nakshatra = {
          name = nakshatra.name;
          imageId = existingNakshatra.imageId;
          description = nakshatra.description;
          rulingDeity = nakshatra.rulingDeity;
          symbol = nakshatra.symbol;
          characteristics = nakshatra.characteristics;
          lunarClimate = nakshatra.lunarClimate;
          karmicLesson = nakshatra.karmicLesson;
          pada1 = nakshatra.pada1;
          pada2 = nakshatra.pada2;
          pada3 = nakshatra.pada3;
          pada4 = nakshatra.pada4;
        };
        nakshatraMap.add(nakshatra.name, updatedNakshatra);
      };
    };
    true;
  };

  public shared ({ caller }) func deleteNakshatra(name : Text) : async Bool {
    validateAccess(#admin, caller);
    let existed = nakshatraMap.containsKey(name);
    nakshatraMap.remove(name);
    existed;
  };

  // Public bublic read
  public query ({ caller }) func readNakshatra(name : Text) : async ?Nakshatra {
    nakshatraMap.get(name);
  };

  public query ({ caller }) func getAllNakshatras() : async [Nakshatra] {
    nakshatraMap.values().toArray();
  };

  public query ({ caller }) func getNakshatraByNumber(number : Nat) : async ?Nakshatra {
    if (number < 1 or number > 27) {
      return null;
    };
    let nakshatras = nakshatraMap.values().toArray();
    if (number > nakshatras.size()) {
      return null;
    };
    ?nakshatras[number - 1];
  };

  public query ({ caller }) func searchNakshatras(term : Text) : async [Nakshatra] {
    let searchTerm = term.toLower();
    let iter = nakshatraMap.values();
    let filtered = iter.filter(
      func(nakshatra) {
        nakshatra.name.toLower().contains(#text searchTerm) or
        nakshatra.description.toLower().contains(#text searchTerm) or
        nakshatra.characteristics.toLower().contains(#text searchTerm);
      }
    );
    filtered.toArray();
  };

  // Image management
  public shared ({ caller }) func replaceNakshatraImage(nakshatraName : Text, imageData : Blob) : async () {
    validateAccess(#user, caller);

    switch (nakshatraMap.get(nakshatraName)) {
      case (null) { Runtime.trap("Nakshatra not found") };
      case (?nakshatra) {
        let newImageId = nextImageId.toText();
        imageStore.add(newImageId, imageData);
        let updatedNakshatra = {
          nakshatra with
          imageId = ?newImageId;
        };
        nakshatraMap.add(nakshatraName, updatedNakshatra);
        nextImageId += 1;
      };
    };
  };

  public query ({ caller }) func getImage(imageId : Text) : async ?Blob {
    imageStore.get(imageId);
  };

  public shared ({ caller }) func uploadImage(imageData : Blob) : async Text {
    validateAccess(#user, caller);
    let newImageId = nextImageId.toText();
    imageStore.add(newImageId, imageData);
    nextImageId += 1;
    newImageId;
  };

  public shared ({ caller }) func deleteImage(imageId : Text) : async Bool {
    validateAccess(#admin, caller);
    let existed = imageStore.containsKey(imageId);
    imageStore.remove(imageId);
    existed;
  };

  // Access control helpers
  func validateAccess(requiredRole : AccessControl.UserRole, caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, requiredRole))) {
      let roleText = roleToText(requiredRole);
      Runtime.trap("Unauthorized: Only " # roleText # " can perform this action");
    };
  };

  func validateSelfOrAdmin(target : Principal, caller : Principal) {
    if (caller != target and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
  };

  func roleToText(role : AccessControl.UserRole) : Text {
    switch (role) {
      case (#admin) { "admins" };
      case (#user) { "users" };
      case (#guest) { "guests" };
    };
  };
};

