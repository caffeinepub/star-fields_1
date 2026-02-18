import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import MixinStorage "blob-storage/Mixin";



actor {
  include MixinStorage();

  type Nakshatra = {
    name : Text;
    imageUrl : Text;
    description : Text;
    rulingDeity : Text;
    symbol : Text;
    characteristics : Text;
  };

  let nakshatraMap = Map.empty<Text, Nakshatra>();

  func initializeNakshatras() {
    let nakshatras : [(Text, Nakshatra)] = [
      (
        "Ashwini",
        {
          name = "Ashwini";
          imageUrl = "/assets/nakshatras/ashwini.png";
          description = "Ashwini is the first Nakshatra and is associated with new beginnings, speed, and vitality.";
          rulingDeity = "Ashwini Kumaras";
          symbol = "Horse's head";
          characteristics = "Energetic, pioneering, and adventurous";
        },
      ),
      (
        "Bharani",
        {
          name = "Bharani";
          imageUrl = "/assets/nakshatras/bharani.png";
          description = "Bharani represents the female reproductive system and is associated with growth, transformation, and nurturing.";
          rulingDeity = "Yama";
          symbol = "Yoni";
          characteristics = "Resourceful, determined, and passionate";
        },
      ),
      (
        "Krittika",
        {
          name = "Krittika";
          imageUrl = "/assets/nakshatras/krittika.png";
          description = "Krittika is symbolized by a sharp blade and is associated with purification, cutting through obstacles, and clarity.";
          rulingDeity = "Agni";
          symbol = "Razor or axe";
          characteristics = "Fiery, determined, and ambitious";
        },
      ),
      (
        "Rohini",
        {
          name = "Rohini";
          imageUrl = "/assets/nakshatras/rohini.png";
          description = "Rohini signifies fertility, growth, and abundance. It is associated with beauty and creativity.";
          rulingDeity = "Brahma";
          symbol = "Cart or chariot";
          characteristics = "Attractive, artistic, and nurturing";
        },
      ),
      (
        "Mrigashira",
        {
          name = "Mrigashira";
          imageUrl = "/assets/nakshatras/mrigashira.png";
          description = "Mrigashira is represented by a deer's head and is associated with curiosity, exploration, and searching.";
          rulingDeity = "Soma";
          symbol = "Deer's head";
          characteristics = "Inquisitive, adaptable, and gentle";
        },
      ),
      (
        "Ardra",
        {
          name = "Ardra";
          imageUrl = "/assets/nakshatras/ardra.png";
          description = "Ardra is associated with transformation, cleansing, and renewal. It represents the power of storms and change.";
          rulingDeity = "Rudra";
          symbol = "Teardrop";
          characteristics = "Intense, emotional, and transformative";
        },
      ),
      (
        "Punarvasu",
        {
          name = "Punarvasu";
          imageUrl = "/assets/nakshatras/punarvasu.png";
          description = "Punarvasu signifies renewal, restoration, and optimism. It is associated with new beginnings and balance.";
          rulingDeity = "Aditi";
          symbol = "Quiver of arrows";
          characteristics = "Optimistic, adaptable, and nurturing";
        },
      ),
      (
        "Pushya",
        {
          name = "Pushya";
          imageUrl = "/assets/nakshatras/pushya.png";
          description = "Pushya is symbolized by a cow's udder and is associated with nourishment, generosity, and growth.";
          rulingDeity = "Brihaspati";
          symbol = "Cow's udder";
          characteristics = "Nurturing, supportive, and wise";
        },
      ),
      (
        "Ashlesha",
        {
          name = "Ashlesha";
          imageUrl = "/assets/nakshatras/ashlesha.png";
          description = "Ashlesha represents transformation, healing, and intuition. It is associated with mystical powers and adaptability.";
          rulingDeity = "Nagas";
          symbol = "Coiled snake";
          characteristics = "Intuitive, charismatic, and mysterious";
        },
      ),
      (
        "Magha",
        {
          name = "Magha";
          imageUrl = "/assets/nakshatras/magha.png";
          description = "Magha signifies leadership, authority, and lineage. It is associated with ancestors and tradition.";
          rulingDeity = "Pitris";
          symbol = "Throne";
          characteristics = "Regal, influential, and respectful";
        },
      ),
      (
        "Purva Phalguni",
        {
          name = "Purva Phalguni";
          imageUrl = "/assets/nakshatras/purva_phalguni.png";
          description = "Purva Phalguni is associated with love, pleasure, and creativity. It represents relaxation and enjoyment.";
          rulingDeity = "Bhaga";
          symbol = "Hammock";
          characteristics = "Creative, sociable, and charming";
        },
      ),
      (
        "Uttara Phalguni",
        {
          name = "Uttara Phalguni";
          imageUrl = "/assets/nakshatras/uttara_phalguni.png";
          description = "Uttara Phalguni signifies commitment, partnership, and service. It is associated with stability and support.";
          rulingDeity = "Aryaman";
          symbol = "Bed or cot";
          characteristics = "Reliable, supportive, and balanced";
        },
      ),
      (
        "Hasta",
        {
          name = "Hasta";
          imageUrl = "/assets/nakshatras/hasta.png";
          description = "Hasta is symbolized by a hand and signifies skillfulness, dexterity, and confidence.";
          rulingDeity = "Savitar";
          symbol = "Hand";
          characteristics = "Skillful, organized, and resourceful";
        },
      ),
      (
        "Chitra",
        {
          name = "Chitra";
          imageUrl = "/assets/nakshatras/chitra.png";
          description = "Chitra represents creativity, beauty, and brilliance. It is associated with art and craftsmanship.";
          rulingDeity = "Tvastar";
          symbol = "Gem or pearl";
          characteristics = "Creative, charismatic, and intelligent";
        },
      ),
      (
        "Swati",
        {
          name = "Swati";
          imageUrl = "/assets/nakshatras/swati.png";
          description = "Swati signifies independence, adaptability, and flexibility. It is associated with movement and freedom.";
          rulingDeity = "Vayu";
          symbol = "Shoot of plant";
          characteristics = "Independent, adaptable, and gentle";
        },
      ),
      (
        "Vishakha",
        {
          name = "Vishakha";
          imageUrl = "/assets/nakshatras/vishakha.png";
          description = "Vishakha is symbolized by a triumphal arch and signifies focus, achievement, and determination.";
          rulingDeity = "Indra and Agni";
          symbol = "Triumphal arch";
          characteristics = "Ambitious, determined, and focused";
        },
      ),
      (
        "Anuradha",
        {
          name = "Anuradha";
          imageUrl = "/assets/nakshatras/anuradha.png";
          description = "Anuradha represents friendship, cooperation, and devotion. It is associated with harmony and success.";
          rulingDeity = "Mitra";
          symbol = "Lotus flower";
          characteristics = "Cooperative, loyal, and friendly";
        },
      ),
      (
        "Jyeshtha",
        {
          name = "Jyeshtha";
          imageUrl = "/assets/nakshatras/jyeshtha.png";
          description = "Jyeshtha signifies seniority, strength, and leadership. It is associated with protection and authority.";
          rulingDeity = "Indra";
          symbol = "Umbrella";
          characteristics = "Protective, authoritative, and resilient";
        },
      ),
      (
        "Mula",
        {
          name = "Mula";
          imageUrl = "/assets/nakshatras/mula.png";
          description = "Mula represents roots, foundation, and transformation. It is associated with uncovering truths and change.";
          rulingDeity = "Nirriti";
          symbol = "Tied bunch of roots";
          characteristics = "Transformative, intense, and determined";
        },
      ),
      (
        "Purva Ashadha",
        {
          name = "Purva Ashadha";
          imageUrl = "/assets/nakshatras/purva_ashadha.png";
          description = "Purva Ashadha is symbolized by a fan and signifies invigoration, growth, and empowerment.";
          rulingDeity = "Apas";
          symbol = "Fan";
          characteristics = "Invigorating, empowering, and enthusiastic";
        },
      ),
      (
        "Uttara Ashadha",
        {
          name = "Uttara Ashadha";
          imageUrl = "/assets/nakshatras/uttara_ashadha.png";
          description = "Uttara Ashadha signifies victory, achievement, and strength. It is associated with enduring success.";
          rulingDeity = "Vishvadevas";
          symbol = "Small bed";
          characteristics = "Victorious, strong, and resilient";
        },
      ),
      (
        "Shravana",
        {
          name = "Shravana";
          imageUrl = "/assets/nakshatras/shravana.png";
          description = "Shravana represents listening, learning, and communication. It is associated with wisdom and understanding.";
          rulingDeity = "Vishnu";
          symbol = "Ear";
          characteristics = "Wise, perceptive, and communicative";
        },
      ),
      (
        "Dhanishta",
        {
          name = "Dhanishta";
          imageUrl = "/assets/nakshatras/dhanishta.png";
          description = "Dhanishta is symbolized by a drum and signifies rhythm, wealth, and prosperity.";
          rulingDeity = "Ashta Vasus";
          symbol = "Drum";
          characteristics = "Prosperous, rhythmic, and adaptable";
        },
      ),
      (
        "Shatabhisha",
        {
          name = "Shatabhisha";
          imageUrl = "/assets/nakshatras/shatabhisha.png";
          description = "Shatabhisha represents healing, secrecy, and mystery. It is associated with medicine and transformation.";
          rulingDeity = "Varuna";
          symbol = "Circle";
          characteristics = "Healing, secretive, and transformative";
        },
      ),
      (
        "Purva Bhadrapada",
        {
          name = "Purva Bhadrapada";
          imageUrl = "/assets/nakshatras/purva_bhadrapada.png";
          description = "Purva Bhadrapada signifies transformation, sacrifice, and spiritual awakening.";
          rulingDeity = "Aja Ekapada";
          symbol = "Sword or two front legs of a bed";
          characteristics = "Transformative, intense, and spiritual";
        },
      ),
      (
        "Uttara Bhadrapada",
        {
          name = "Uttara Bhadrapada";
          imageUrl = "/assets/nakshatras/uttara_bhadrapada.png";
          description = "Uttara Bhadrapada represents stability, deep wisdom, and prosperity. It is associated with firmness and patience.";
          rulingDeity = "Ahir Budhnya";
          symbol = "Twin bed or snake";
          characteristics = "Stable, wise, and patient";
        },
      ),
      (
        "Revati",
        {
          name = "Revati";
          imageUrl = "/assets/nakshatras/revati.png";
          description = "Revati is the last Nakshatra and signifies nourishment, protection, and prosperity. It is associated with safe travels and completion.";
          rulingDeity = "Pushan";
          symbol = "Fish";
          characteristics = "Nourishing, protective, and compassionate";
        },
      ),
    ];
    for ((key, value) in nakshatras.values()) {
      nakshatraMap.add(key, value);
    };
  };

  // CRUD operations for Nakshatras
  public shared ({ caller }) func createNakshatra(nakshatra : Nakshatra) : async Bool {
    nakshatraMap.add(nakshatra.name, nakshatra);
    true;
  };

  public query ({ caller }) func readNakshatra(name : Text) : async ?Nakshatra {
    nakshatraMap.get(name);
  };

  public shared ({ caller }) func updateNakshatra(nakshatra : Nakshatra) : async Bool {
    nakshatraMap.add(nakshatra.name, nakshatra);
    true;
  };

  public shared ({ caller }) func deleteNakshatra(name : Text) : async Bool {
    let existed = nakshatraMap.containsKey(name);
    nakshatraMap.remove(name);
    existed;
  };

  public query ({ caller }) func getAllNakshatras() : async [Nakshatra] {
    nakshatraMap.values().toArray();
  };

  // Helper function to get Nakshatra by number (1-27)
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

  // Initialize Nakshatras if empty (first deploy / after wipe)
  public shared ({ caller }) func initialize() : async () {
    if (nakshatraMap.isEmpty()) {
      initializeNakshatras();
    };
  };
};

