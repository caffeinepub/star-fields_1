import Map "mo:core/Map";
import Blob "mo:core/Blob";
import Principal "mo:core/Principal";

module {
  public type AdminActor = {
    nextImageId : Nat;
    nakshatraMap : Map.Map<Text, {
      name : Text;
      imageId : ?Text;
      description : Text;
      rulingDeity : Text;
      symbol : Text;
      characteristics : Text;
      pada1 : {
        title : Text;
        description : Text;
      };
      pada2 : {
        title : Text;
        description : Text;
      };
      pada3 : {
        title : Text;
        description : Text;
      };
      pada4 : {
        title : Text;
        description : Text;
      };
    }>;
    imageStore : Map.Map<Text, Blob>;
    userProfiles : Map.Map<Principal, { name : Text }>;
  };

  public func run(admin : AdminActor) : AdminActor {
    admin;
  };
};
