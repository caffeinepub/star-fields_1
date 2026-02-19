import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Blob "mo:core/Blob";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile System
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Nakshatra Types
  type PadaInfo = {
    title : Text;
    description : Text;
  };

  type Nakshatra = {
    name : Text;
    imageId : ?Text;
    description : Text;
    rulingDeity : Text;
    symbol : Text;
    characteristics : Text;
    pada1 : PadaInfo;
    pada2 : PadaInfo;
    pada3 : PadaInfo;
    pada4 : PadaInfo;
  };

  let nakshatraMap = Map.empty<Text, Nakshatra>();

  // Blob storage for images
  let imageStore = Map.empty<Text, Blob>();
  var nextImageId = 1;

  // CRUD operations for Nakshatras
  // Admin-only: Create new Nakshatra
  public shared ({ caller }) func createNakshatra(nakshatra : Nakshatra) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create Nakshatras");
    };
    nakshatraMap.add(nakshatra.name, nakshatra);
    true;
  };

  // Public read: Anyone can read Nakshatra data
  public query ({ caller }) func readNakshatra(name : Text) : async ?Nakshatra {
    nakshatraMap.get(name);
  };

  // Admin-only: Update existing Nakshatra
  public shared ({ caller }) func updateNakshatra(nakshatra : Nakshatra) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update Nakshatras");
    };
    nakshatraMap.add(nakshatra.name, nakshatra);
    true;
  };

  // Admin-only: Delete Nakshatra
  public shared ({ caller }) func deleteNakshatra(name : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete Nakshatras");
    };
    let existed = nakshatraMap.containsKey(name);
    nakshatraMap.remove(name);
    existed;
  };

  // Public read: Anyone can get all Nakshatras
  public query ({ caller }) func getAllNakshatras() : async [Nakshatra] {
    nakshatraMap.values().toArray();
  };

  // Public read: Anyone can get Nakshatra by number
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

  // Public read: Anyone can search Nakshatras
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

  // Admin-only: Replace Nakshatra image
  public shared ({ caller }) func replaceNakshatraImage(nakshatraName : Text, imageData : Blob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can replace images");
    };

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

  // Public read: Anyone can retrieve image by ID
  public query ({ caller }) func getImage(imageId : Text) : async ?Blob {
    imageStore.get(imageId);
  };

  // User-only: Upload image (authenticated users only, not anonymous)
  public shared ({ caller }) func uploadImage(imageData : Blob) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can upload images");
    };
    let newImageId = nextImageId.toText();
    imageStore.add(newImageId, imageData);
    nextImageId += 1;
    newImageId;
  };

  // Admin-only: Delete image
  public shared ({ caller }) func deleteImage(imageId : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete images");
    };
    let existed = imageStore.containsKey(imageId);
    imageStore.remove(imageId);
    existed;
  };
};
