/**
 * Alt text for every site image, written from what each photo actually shows (≤125 characters).
 * Used wherever the image appears, so the description stays accurate even when a photo is reused
 * under a different heading. Decorative backgrounds intentionally use "" (screen readers skip them).
 */
export const IMAGE_ALT: Record<string, string> = {
  "/images/hero_bridal_16x9.jpg":
    "22K gold temple necklace set with ruby and emerald stones, maang tikka and jhumka earrings on white marble",
  "/images/hero_modern_8k.jpg": "Delicate gold chain with a solitaire pendant on black velvet",
  "/images/antique_main_necklace.png":
    "Antique 22K gold temple necklace with goddess pendant, ruby and emerald stones and pearl drops",
  "/images/antique_side_earrings.png": "Antique gold jhumka earrings with ruby and emerald studs and pearl drops",
  "/images/antique_side_kamarbandh.png": "Antique gold kamarbandh waist belt with a ruby centrepiece and temple motifs",
  "/images/bangles_kadas.png": "Stack of 22K gold bangles and kadas on a cream display cushion",
  "/images/bridal_collection.png": "Layered gold bridal necklace sets on a display bust in a jewellery showroom",
  "/images/bridal_necklace.png": "Gold bridal choker necklace with polki stones and a gold bead border",
  "/images/bridal_necklace_sets.png":
    "22K gold bridal necklace set with maang tikka and jhumka earrings on white marble",
  "/images/catalog_earrings.png": "22K gold bridal necklace set with maang tikka and jhumka earrings on white marble",
  "/images/product_main.png": "22K gold bridal necklace set with maang tikka and jhumka earrings on white marble",
  "/images/catalog_ring.png": "Gold ring with a red ruby centre stone and filigree band",
  "/images/catalog_necklace.png": "Assorted 22K gold chains layered on a black display bust",
  "/images/heritage_necklaces.png": "Long gold temple haram necklace with matching jhumka earrings on a display bust",
  "/images/kids_main_pendant.png": "Fine gold chain with a small star pendant for kids",
  "/images/kids_side_bangles.png": "Thin gold bangles for children on soft white fur",
  "/images/kids_side_nazariya.png": "Gold nazariya bracelet with black beads and an evil-eye charm for babies",
  "/images/male_main_chain.png": "Heavy men's gold curb chain coiled on dark slate",
  "/images/male_side_bracelet.png": "Men's gold kada bracelet with an engraved band",
  "/images/male_side_ring.png": "Men's gold signet ring with an engraved crest",
  "/images/mangalsutra.png": "Gold mangalsutra with black beads and a small pendant",
  "/images/wishlist_earrings.png": "Diamond drop earrings in a teardrop design on a display stand",
  "/images/wishlist_necklace.png": "Gold filigree necklace with diamond accents on a linen display",
  "/images/wishlist_ring.png": "Gold ring with a large emerald and an engraved shank",
  "/images/wishlist_bangles.png": "Pair of engraved 22K gold bangles on marble",
  "/images/premium_chains.png": "Assorted 22K gold chains in a range of weights",
  "/images/artisan_rings.png": "Handcrafted gold rings for engagement and daily wear",
  "/images/statement_bangles.png": "Gold statement bangles in classic and contemporary designs",
  // Decorative backgrounds — not product photos and not our actual showroom
  "/images/contact_hero_light.png": "",
  "/images/wedding_palace_bg.jpg": "",
};

/** Alt text for a site image path, falling back to the given text. */
export const altFor = (src: string, fallback: string) => IMAGE_ALT[src] ?? fallback;
