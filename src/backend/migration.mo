import Map "mo:core/Map";
import Text "mo:core/Text";

module {
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

  public func seedDataFromMigration() : Map.Map<Text, Nakshatra> {
    let nakshatraMap = Map.empty<Text, Nakshatra>();
    nakshatraMap.add("Ashwini", createNakshatra("Ashwini", "The Star of Initiation - Symbolizes swift action, leadership, and healing. Ashwini star represents the beginning of new cycles and breakthroughs.", "Ashwin Kumars (Twin Horsemen)", "Horse's head", "Initiation, new beginnings, healing, energy, drive for achievement. Those born under Ashwini demonstrate an inherent spark and vitality, though they must learn patience and endurance to succeed.", "Curious, active, exploratory climate. Curiosity and need for movement drive Ashwini nature.", "Patience and follow-through are needed for true healing and lasting impressions. Ashwini energy pushes for fresh starts.", createPadaInfo("Pada 1 (Aries)", "Intellectual skills, curiosity, based in Aries. Brings dexterity and sharp intellect."), createPadaInfo("Pada 2 (Taurus)", "Creative and practical, Taurus-based. Blends creativity with practicality."), createPadaInfo("Pada 3 (Gemini)", "Communication and adaptability, Gemini-based. Highlights flexible nature."), createPadaInfo("Pada 4 (Cancer)", "Compassion and nurturing, Cancer-based. Fosters empathy and caring in driving personality.")));
    nakshatraMap.add("Bharani", createNakshatra("Bharani", "The Star of Restraint - Bharani embodies cycles, transformation, and determination in the face of life's challenges.", "Yama (God of Death)", "Yoni (female organ)", "Transformation, stamina, discipline, willpower, creative destruction. Bharani individuals show exceptional strength, self-discipline, and a unique ability to bounce back from adversity.", "Persistent, focused, ordered climate. Focus and commitment are Bharani strengths.", "Embrace change, transform old into new. Seek growth in self and others through persistence.", createPadaInfo("Pada 1 (Taurus)", "Focused, practical, based in Taurus. Brings material growth, focus and determination."), createPadaInfo("Pada 2 (Gemini)", "Communication, adaptability, Gemini-based. Highlights perseverance in relationships and ventures."), createPadaInfo("Pada 3 (Cancer)", "Nurturing, intuitive, Cancer-based. Encourages nurturing resilience and helpfulness."), createPadaInfo("Pada 4 (Leo)", "Confidence, leadership, Leo-based. Blends leadership with creativity and personal magnetism.")));
    nakshatraMap;
  };

  func createNakshatra(name : Text, description : Text, rulingDeity : Text, symbol : Text, characteristics : Text, lunarClimate : Text, karmicLesson : Text, pada1 : PadaInfo, pada2 : PadaInfo, pada3 : PadaInfo, pada4 : PadaInfo) : Nakshatra {
    {
      name;
      imageId = null : ?Text;
      description;
      rulingDeity;
      symbol;
      characteristics;
      lunarClimate;
      karmicLesson;
      pada1;
      pada2;
      pada3;
      pada4;
    };
  };

  func createPadaInfo(title : Text, description : Text) : PadaInfo {
    { title; description };
  };
};

