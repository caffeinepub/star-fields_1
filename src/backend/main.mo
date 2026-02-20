import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Blob "mo:core/Blob";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Nat "mo:core/Nat";

// Remove the unused migration with clause
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
  public type PadaInfo = {
    title : Text;
    description : Text;
  };

  // New Nakshatra type with additional fields
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

  // Export/Import types
  public type ImageExport = {
    imageId : Text;
    imageData : Blob;
  };

  let nakshatraMap = Map.empty<Text, Nakshatra>();

  // Blob storage for images
  let imageStore = Map.empty<Text, Blob>();
  var nextImageId = 1;

  // Admin-only: Create new Nakshatra
  public shared ({ caller }) func createNakshatra(nakshatra : Nakshatra) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create Nakshatras");
    };
    nakshatraMap.add(nakshatra.name, nakshatra);
    true;
  };

  // Public: Read Nakshatra
  public query ({ caller }) func readNakshatra(name : Text) : async ?Nakshatra {
    nakshatraMap.get(name);
  };

  // User-only: Update Nakshatra (excluding image)
  public shared ({ caller }) func updateNakshatra(nakshatra : Nakshatra) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update Nakshatras");
    };
    switch (nakshatraMap.get(nakshatra.name)) {
      case (null) {
        Runtime.trap("Nakshatra not found");
      };
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

  // User-only: Replace Nakshatra image
  public shared ({ caller }) func replaceNakshatraImage(nakshatraName : Text, imageData : Blob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can replace images");
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

  // Admin-only: Export all Nakshatra data
  public query ({ caller }) func exportNakshatraData() : async [Nakshatra] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can export Nakshatra data");
    };
    nakshatraMap.values().toArray();
  };

  // Admin-only: Export all image blobs with metadata
  public query ({ caller }) func exportImageData() : async [ImageExport] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can export image data");
    };
    let exports = Map.empty<Text, ImageExport>();
    for ((imageId, imageData) in imageStore.entries()) {
      exports.add(imageId, { imageId; imageData });
    };
    exports.values().toArray();
  };

  // Admin-only: Import Nakshatra data (replaces all existing entries)
  public shared ({ caller }) func importNakshatraData(nakshatras : [Nakshatra]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can import Nakshatra data");
    };

    // Clear existing data
    for (key in nakshatraMap.keys()) {
      nakshatraMap.remove(key);
    };

    // Import new data
    for (nakshatra in nakshatras.vals()) {
      nakshatraMap.add(nakshatra.name, nakshatra);
    };
  };

  // Admin-only: Import image data (replaces existing images with matching IDs)
  public shared ({ caller }) func importImageData(images : [ImageExport]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can import image data");
    };

    // Import images, replacing any with matching IDs
    for (imageExport in images.vals()) {
      imageStore.add(imageExport.imageId, imageExport.imageData);

      // Update nextImageId if necessary to avoid conflicts
      switch (Nat.fromText(imageExport.imageId)) {
        case (?id) {
          if (id >= nextImageId) {
            nextImageId := id + 1;
          };
        };
        case (null) { /* Non-numeric ID, ignore */ };
      };
    };
  };
};
