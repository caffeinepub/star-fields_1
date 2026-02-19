import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  // Old types matching previous version
  type OldPadaInfo = {
    title : Text;
    description : Text;
  };

  type OldNakshatra = {
    name : Text;
    imageId : ?Text;
    description : Text;
    rulingDeity : Text;
    symbol : Text;
    characteristics : Text;
    pada1 : OldPadaInfo;
    pada2 : OldPadaInfo;
    pada3 : OldPadaInfo;
    pada4 : OldPadaInfo;
  };

  type OldActor = {
    nakshatraMap : Map.Map<Text, OldNakshatra>;
  };

  // New types matching current version
  type NewPadaInfo = {
    title : Text;
    description : Text;
  };

  type NewNakshatra = {
    name : Text;
    imageId : ?Text;
    description : Text;
    rulingDeity : Text;
    symbol : Text;
    characteristics : Text;
    lunarClimate : Text;
    karmicLesson : Text;
    pada1 : NewPadaInfo;
    pada2 : NewPadaInfo;
    pada3 : NewPadaInfo;
    pada4 : NewPadaInfo;
  };

  type NewActor = {
    nakshatraMap : Map.Map<Text, NewNakshatra>;
  };

  public func run(old : OldActor) : NewActor {
    let newNakshatraMap = old.nakshatraMap.map<Text, OldNakshatra, NewNakshatra>(
      func(name, oldNakshatra) {
        migrateNakshatra(oldNakshatra);
      }
    );
    { nakshatraMap = newNakshatraMap };
  };

  func migrateNakshatra(old : OldNakshatra) : NewNakshatra {
    switch (old.name.toLower()) {
      case ("ashwini") {
        { old with
          lunarClimate = "fast, instinctive, catalytic momentum";
          karmicLesson = "Act with courage but remember sustainability";
        };
      };
      case ("bharani") {
        { old with
          lunarClimate = "emotional intensity and moral weight";
          karmicLesson = "Freedom requires accountability";
        };
      };
      case ("krittika") {
        { old with
          lunarClimate = "sharpens perception, exposes refinement needs";
          karmicLesson = "Growth requires discernment";
        };
      };
      case ("rohini") {
        { old with
          lunarClimate = "softens with beauty and attachment";
          karmicLesson = "Enjoy growth without clinging";
        };
      };
      case ("mrigashira") {
        { old with
          lunarClimate = "curious and searching, restless";
          karmicLesson = "Seek without fleeing";
        };
      };
      case ("ardra") {
        { old with
          lunarClimate = "storm energy, breaks open truths";
          karmicLesson = "Transformation through discomfort";
        };
      };
      case ("punarvasu") {
        { old with
          lunarClimate = "restores optimism and hope";
          karmicLesson = "Resilience is remembering light returns";
        };
      };
      case ("pushya") {
        { old with
          lunarClimate = "steadies with responsibility and care";
          karmicLesson = "Service strengthens the soul";
        };
      };
      case ("ashlesha") {
        { old with
          lunarClimate = "deepens perception of hidden motives";
          karmicLesson = "Use insight for healing not control";
        };
      };
      case ("magha") {
        { old with
          lunarClimate = "legacy and ancestral themes";
          karmicLesson = "Honor lineage with humility";
        };
      };
      case ("purva phalguni") {
        { old with
          lunarClimate = "pleasure and artistic flow";
          karmicLesson = "Joy is sacred, balance indulgence";
        };
      };
      case ("uttara phalguni") {
        { old with
          lunarClimate = "commitment and loyalty";
          karmicLesson = "True partnership requires consistency";
        };
      };
      case ("hasta") {
        { old with
          lunarClimate = "sharpens skill and communication";
          karmicLesson = "Mastery through refinement";
        };
      };
      case ("chitra") {
        { old with
          lunarClimate = "inspires refinement and self-expression";
          karmicLesson = "Create with authenticity";
        };
      };
      case ("swati") {
        { old with
          lunarClimate = "wind-like independence";
          karmicLesson = "Freedom needs direction";
        };
      };
      case ("vishakha") {
        { old with
          lunarClimate = "intensifies ambition";
          karmicLesson = "Pursue victory with integrity";
        };
      };
      case ("anuradha") {
        { old with
          lunarClimate = "devotion and cooperation";
          karmicLesson = "Loyalty without losing self";
        };
      };
      case ("jyeshtha") {
        { old with
          lunarClimate = "power dynamics surface";
          karmicLesson = "Leadership requires humility";
        };
      };
      case ("mula") {
        { old with
          lunarClimate = "uproots illusions";
          karmicLesson = "Liberation through releasing false roots";
        };
      };
      case ("purva ashadha") {
        { old with
          lunarClimate = "conviction and enthusiasm";
          karmicLesson = "Confidence with openness to growth";
        };
      };
      case ("uttara ashadha") {
        { old with
          lunarClimate = "discipline and endurance";
          karmicLesson = "Victory through sustained effort";
        };
      };
      case ("shravana") {
        { old with
          lunarClimate = "heightens listening";
          karmicLesson = "Wisdom from attentive presence";
        };
      };
      case ("dhanishtha") {
        { old with
          lunarClimate = "productivity and timing";
          karmicLesson = "Align with collective harmony";
        };
      };
      case ("shatabhisha") {
        { old with
          lunarClimate = "turns inward, analytical";
          karmicLesson = "Solitude reveals truths";
        };
      };
      case ("purva bhadrapada") {
        { old with
          lunarClimate = "existential intensity";
          karmicLesson = "Transformation demands surrender";
        };
      };
      case ("uttara bhadrapada") {
        { old with
          lunarClimate = "patience and depth";
          karmicLesson = "Stability from inner depth";
        };
      };
      case ("revati") {
        { old with
          lunarClimate = "softens and closes cycle";
          karmicLesson = "Completion is sacred";
        };
      };
      case (_) {
        { old with
          lunarClimate = "";
          karmicLesson = "";
        };
      };
    };
  };
};
