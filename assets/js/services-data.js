const NOVA_SERVICES = [
  {
    id: 'luxury-haircut',
    title: 'Luxury Haircut & Styling',
    category: 'Hair Design',
    subtitle: 'Hair Care Suite',
    metaTitle: 'Luxury Haircut & Styling - NOVA Salon',
    metaDescription: 'Book NOVA Salon luxury haircut and styling with scalp care, precision cutting, premium blowout, benefits, pricing, FAQs, and client reviews.',
    heroImage: './assets/images/img9.jpg',
    heroAlt: 'Luxury haircut and styling chair at NOVA Salon',
    descriptionTitle: 'Reimagining Hair Design',
    description: [
      'Our Luxury Haircut & Styling service is a bespoke hair design session built around face shape, hair density, lifestyle, and finish preference. Every appointment starts with a calm consultation and scalp check so your stylist can shape the cut with intention.',
      'The experience includes a gentle cleanse, conditioning treatment, precision haircut, thermal protection, and a polished blowout. You leave with a salon finish and practical styling guidance for keeping the shape fresh at home.'
    ],
    gallery: [
      { src: './assets/images/img1.jpg', alt: 'Precision haircut consultation' },
      { src: './assets/images/img10.jpg', alt: 'Luxury blowout styling finish' },
      { src: './assets/images/img5.jpg', alt: 'Premium salon styling station' }
    ],
    benefits: [
      ['Personalized Shape', 'Cutting lines are adjusted to your face shape, hair texture, and daily styling rhythm.'],
      ['Healthy Ends', 'A precise trim and conditioning ritual help remove dryness while keeping movement.'],
      ['Scalp Comfort', 'A soothing scalp massage supports relaxation before the styling process begins.'],
      ['Lasting Finish', 'Thermal protection and serum lock help the blowout hold shape for up to 48 hours.']
    ],
    steps: [
      ['Consultation', 'Discuss inspiration, maintenance level, hair history, and preferred finish.'],
      ['Cleanse and Treat', 'Cleanse, scalp massage, and lightweight conditioning based on hair needs.'],
      ['Precision Cut', 'Shape, layer, and detail the haircut with balanced movement.'],
      ['Blowout Finish', 'Dry, smooth, polish, and teach quick at-home styling cues.']
    ],
    process: [
      'Arrive with inspiration photos if you have them.',
      'Your stylist confirms length, layers, fringe, and styling goal before cutting.',
      'The finished style is reviewed from every angle and adjusted before you leave.'
    ],
    duration: '60 mins',
    pricing: {
      total: '$85.00',
      items: [
        ['Scalp Detox and Consultation', '$25.00'],
        ['Designer Cut and Conditioning', '$40.00'],
        ['Blowout Styling and Serum Lock', '$20.00']
      ]
    },
    rating: '4.9',
    reviewCount: '124',
    reviews: [
      {
        name: 'Victoria Sterling',
        date: 'August 1, 2026',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
        body: 'Sophia understood exactly how much length I wanted to keep and refreshed the color around my face beautifully. The blowout lasted through two events.'
      },
      {
        name: 'Marcus Vance',
        date: 'July 26, 2026',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
        body: 'Clean, calm, and detailed. The cut sits well without effort, and the color gloss made everything look sharper on camera.'
      }
    ],
    faq: [
      ['Can I choose my stylist?', 'Yes. You can request Sophia Laurent, Liam Thorne, or any available master stylist during booking.'],
      ['Should I wash my hair before the visit?', 'You do not need to. The service includes a professional cleanse and conditioning ritual.'],
      ['How often should I rebook?', 'Most guests return every 6 to 8 weeks to maintain shape, volume, and healthy ends.']
    ],
    relatedServices: ['balayage', 'nail-artistry', 'collagen-facial']
  },
  {
    id: 'balayage',
    title: 'Balayage Highlight & Color',
    category: 'Hair Color',
    subtitle: 'Dimensional Color Atelier',
    metaTitle: 'Balayage Highlight & Color - NOVA Salon',
    metaDescription: 'Explore NOVA Salon balayage highlight and color with custom color mapping, gloss, aftercare, pricing, gallery, FAQs, and client reviews.',
    heroImage: './assets/images/img10.jpg',
    heroAlt: 'Dimensional balayage color service at NOVA Salon',
    descriptionTitle: 'Soft Dimension, Custom Painted',
    description: [
      'Balayage Highlight & Color is designed for guests who want luminous dimension with a softer grow-out than traditional foil highlights. Your colorist maps brightness around your face, haircut, base color, and seasonal tone goals.',
      'The service includes hand-painted lightening, bond support, gloss toning, a moisture treatment, and a finished style so the result can be checked in movement and natural light.'
    ],
    gallery: [
      { src: './assets/images/img10.jpg', alt: 'Hand painted balayage sectioning' },
      { src: './assets/images/img16.jpg', alt: 'Fresh brunette balayage finish' },
      { src: './assets/images/img21.jpg', alt: 'Dimensional highlight color result' }
    ],
    benefits: [
      ['Softer Grow-Out', 'Painted placement keeps regrowth diffused and natural.'],
      ['Custom Tone', 'Gloss is mixed to suit skin tone, base color, and season.'],
      ['Bond Support', 'Color care steps help protect strength during lightening.'],
      ['Face Framing Glow', 'Brightness is placed where it lifts and softens the face.']
    ],
    steps: [
      ['Color Consultation', 'Review color history, inspiration, and maintenance expectations.'],
      ['Painted Placement', 'Hand-paint highlights with careful saturation and spacing.'],
      ['Gloss and Treat', 'Tone, gloss, and condition for shine and softness.'],
      ['Finish and Aftercare', 'Style the hair and set a home-care plan for tone protection.']
    ],
    process: [
      'A strand and color-history check is completed before lightening.',
      'Your colorist chooses placement based on haircut movement and grow-out goals.',
      'Aftercare is reviewed before checkout so tone stays clear between visits.'
    ],
    duration: '180 mins',
    pricing: {
      total: '$180.00',
      items: [
        ['Custom Color Mapping', '$35.00'],
        ['Balayage Lightening Service', '$95.00'],
        ['Gloss, Bond Care, and Blowout', '$50.00']
      ]
    },
    rating: '4.8',
    reviewCount: '98',
    reviews: [
      {
        name: 'Alexandra Dubois',
        date: 'July 30, 2026',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=120',
        body: 'The color looks expensive but still natural. The face-framing pieces are bright without feeling stripy, and I love that the grow-out will be soft.'
      },
      {
        name: 'Nina Patel',
        date: 'July 18, 2026',
        image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&q=80&w=120',
        body: 'My old highlights were uneven, and NOVA blended everything into a warm, glossy brunette finish with just the right amount of dimension.'
      }
    ],
    faq: [
      ['Is balayage lower maintenance than highlights?', 'Usually, yes. The placement is softer at the root, so many guests rebook every 10 to 14 weeks.'],
      ['Will I need toner?', 'Yes. Gloss toner refines warmth, adds shine, and helps create the final shade.'],
      ['Can balayage cover gray hair?', 'Balayage adds brightness but does not fully replace gray coverage. Your colorist can combine it with root color if needed.']
    ],
    relatedServices: ['luxury-haircut', 'bridal-makeup', 'collagen-facial']
  },
  {
    id: 'collagen-facial',
    title: 'Collagen Gold Facial',
    category: 'Skincare',
    subtitle: 'Radiance Treatment Room',
    metaTitle: 'Collagen Gold Facial - NOVA Salon',
    metaDescription: 'Discover NOVA Salon Collagen Gold Facial with skin prep, collagen mask, glow benefits, pricing, treatment steps, FAQs, and testimonials.',
    heroImage: './assets/images/img11.jpg',
    heroAlt: 'Collagen gold facial treatment room',
    descriptionTitle: 'A Polished Glow Ritual',
    description: [
      'The Collagen Gold Facial targets dullness, dehydration, and visible fatigue with a layered ritual of cleanse, exfoliation, massage, collagen infusion, and gold-tone radiance support.',
      'Your aesthetician adapts pressure, exfoliation strength, and finishing hydration to your skin condition on the day of your appointment so the result looks fresh instead of overworked.'
    ],
    gallery: [
      { src: './assets/images/img11.jpg', alt: 'Gold facial mask application' },
      { src: './assets/images/img18.jpg', alt: 'Pre facial skin preparation' },
      { src: './assets/images/img20.jpg', alt: 'Radiant post facial skincare finish' }
    ],
    benefits: [
      ['Instant Glow', 'Hydrating layers help skin look fresh, smooth, and luminous.'],
      ['Calmer Texture', 'Gentle exfoliation supports a softer skin surface.'],
      ['Collagen Support', 'Marine collagen products help plump the look of fine lines.'],
      ['Event Ready Finish', 'The treatment is polished enough for events without aggressive downtime.']
    ],
    steps: [
      ['Skin Review', 'Discuss sensitivity, products, recent reactions, and skin goals.'],
      ['Cleanse and Polish', 'Remove buildup with a gentle cleanse and exfoliation.'],
      ['Massage and Mask', 'Apply collagen-gold mask with facial massage and pressure-point work.'],
      ['Hydrate and Protect', 'Finish with serum, moisturizer, and SPF guidance.']
    ],
    process: [
      'Avoid strong retinoids or exfoliants for two days before the appointment.',
      'Your aesthetician will adjust exfoliation if skin is reactive.',
      'Drink water after the treatment and keep skincare simple for 24 hours.'
    ],
    duration: '75 mins',
    pricing: {
      total: '$120.00',
      items: [
        ['Skin Analysis and Cleanse', '$25.00'],
        ['Collagen Gold Mask Ritual', '$65.00'],
        ['Serum Layering and SPF Finish', '$30.00']
      ]
    },
    rating: '5.0',
    reviewCount: '84',
    reviews: [
      {
        name: 'Camille Ross',
        date: 'August 2, 2026',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
        body: 'The collagen mask left my skin smooth, calm, and luminous without any redness. It was exactly the reset I wanted before dinner plans.'
      },
      {
        name: 'Priya Shah',
        date: 'July 21, 2026',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
        body: 'Emma adjusted the exfoliation for my sensitive skin and focused on hydration. The glow stayed soft and fresh for days.'
      }
    ],
    faq: [
      ['Is there downtime?', 'Most guests leave with a healthy glow and no downtime. Reactive skin may look pink briefly.'],
      ['Can I wear makeup after?', 'For best results, keep skin clean for the rest of the day and wear makeup the next morning.'],
      ['How often should I book?', 'Monthly facials are ideal for steady hydration, texture support, and skin monitoring.']
    ],
    relatedServices: ['aromatherapy-massage', 'nail-artistry', 'bridal-makeup']
  },
  {
    id: 'nail-artistry',
    title: 'Signature Nail Artistry',
    category: 'Nail Art',
    subtitle: 'Nail Atelier',
    metaTitle: 'Signature Nail Artistry - NOVA Salon',
    metaDescription: 'Book NOVA Signature Nail Artistry with nail shaping, cuticle care, premium gel polish, hand treatment, pricing, gallery, FAQs, and reviews.',
    heroImage: './assets/images/img12.jpg',
    heroAlt: 'Signature gel manicure at NOVA nail atelier',
    descriptionTitle: 'Gloss, Shape, and Hand Care',
    description: [
      'Signature Nail Artistry is a polished nail-care appointment for guests who want clean shaping, soft cuticles, durable color, and refined accent detail.',
      'The service includes nail shaping, cuticle detailing, gentle buffing, gel color, hydration oil, and a warm hand treatment. The result is elegant, durable, and easy to maintain.'
    ],
    gallery: [
      { src: './assets/images/img12.jpg', alt: 'Gel manicure polish detail' },
      { src: './assets/images/img4.jpg', alt: 'Nail care tools and polish shades' },
      { src: './assets/images/img7.jpg', alt: 'Finished NOVA gel manicure' }
    ],
    benefits: [
      ['Long Wear Shine', 'Premium gel polish helps maintain gloss and chip resistance.'],
      ['Clean Cuticles', 'Detailed cuticle care makes the manicure look precise.'],
      ['Comfortable Shape', 'Nails are shaped to suit your hands and daily routine.'],
      ['Hydrated Hands', 'Oil and hand treatment soften the surrounding skin.']
    ],
    steps: [
      ['Shape and Prep', 'File, shape, and gently prepare the nail plate.'],
      ['Cuticle Care', 'Detail cuticles and tidy surrounding skin.'],
      ['Gel Application', 'Apply base, color, and top coat with proper curing.'],
      ['Oil and Finish', 'Hydrate cuticles and review home-care tips.']
    ],
    process: [
      'Arrive with old gel removed or book safe removal as an add-on.',
      'Choose color from seasonal, neutral, and event-ready palettes.',
      'Use cuticle oil daily to keep the manicure glossy longer.'
    ],
    duration: '45 mins',
    pricing: {
      total: '$55.00',
      items: [
        ['Nail Shaping and Prep', '$15.00'],
        ['Cuticle Care and Gel Polish', '$30.00'],
        ['Oil Treatment and Hand Finish', '$10.00']
      ]
    },
    rating: '4.7',
    reviewCount: '210',
    reviews: [
      {
        name: 'Meera Iyer',
        date: 'August 3, 2026',
        image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=120',
        body: 'The almond shape was flawless and the fine gold accent line looked elegant, not busy. My manicure stayed glossy through a week of travel.'
      },
      {
        name: 'Chloe Martin',
        date: 'July 29, 2026',
        image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=120',
        body: 'Mia helped me choose a soft nude chrome that matched my jewelry. The cuticle work was precise and the finish looked editorial.'
      }
    ],
    faq: [
      ['How long does gel last?', 'Most guests enjoy 2 to 3 weeks of wear with proper home care.'],
      ['Do you offer safe removal?', 'Yes. We recommend professional removal to protect the nail plate.'],
      ['Can I add nail art?', 'Yes. Minimal nail art, chrome, French tips, and accent details can be added during booking.']
    ],
    relatedServices: ['collagen-facial', 'bridal-makeup', 'luxury-haircut']
  },
  {
    id: 'bridal-makeup',
    title: 'Bridal Makeup & Styling',
    category: 'Makeup',
    subtitle: 'Bridal Beauty Studio',
    metaTitle: 'Bridal Makeup & Styling - NOVA Salon',
    metaDescription: 'Plan NOVA Bridal Makeup and Styling with trial guidance, wedding-day process, pricing, benefits, gallery, FAQs, and bridal testimonials.',
    heroImage: './assets/images/img13.jpg',
    heroAlt: 'Bridal makeup and styling appointment',
    descriptionTitle: 'Camera-Ready, Calm, and Personal',
    description: [
      'Bridal Makeup & Styling is designed to help you feel polished, comfortable, and recognizable on one of your most photographed days. We build the look around your dress, venue, skin finish, hair plan, and personal comfort.',
      'The appointment includes complexion prep, long-wear makeup, lashes if desired, hair styling coordination, and a final touch-up kit recommendation for the ceremony and reception.'
    ],
    gallery: [
      { src: './assets/images/img13.jpg', alt: 'Bridal makeup complexion prep' },
      { src: './assets/images/img19.jpg', alt: 'Wedding makeup finish closeup' },
      { src: './assets/images/img3.jpg', alt: 'Bridal styling tools and palette' }
    ],
    benefits: [
      ['Long-Wear Finish', 'Complexion, eyes, and lips are layered for photography and movement.'],
      ['Trial Friendly', 'A trial helps refine skin finish, lashes, lip tone, and hair direction.'],
      ['Calm Timeline', 'We plan timing buffers so the wedding morning stays smooth.'],
      ['Personal Look', 'The final result enhances your features without feeling costume-like.']
    ],
    steps: [
      ['Beauty Brief', 'Review dress, venue, inspiration, skin concerns, and comfort level.'],
      ['Skin and Hair Prep', 'Prime skin and prepare hair for the desired hold and shape.'],
      ['Makeup and Styling', 'Create the look in layers for durability and camera balance.'],
      ['Final Checks', 'Review in different light and note touch-up essentials.']
    ],
    process: [
      'Schedule a trial once dress and hair inspiration are clear.',
      'Avoid new skincare actives or waxing immediately before the event.',
      'Bring veil, accessories, or reference photos to the final appointment.'
    ],
    duration: '120 mins',
    pricing: {
      total: '$250.00',
      items: [
        ['Bridal Beauty Consultation', '$45.00'],
        ['HD Makeup and Lash Finish', '$135.00'],
        ['Hair Styling Coordination', '$70.00']
      ]
    },
    rating: '4.9',
    reviewCount: '112',
    reviews: [
      {
        name: 'Isabella Reed',
        date: 'June 14, 2026',
        image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=120',
        body: 'My makeup stayed perfect through portraits, dinner, and dancing, but still looked like me. The skin finish photographed beautifully.'
      },
      {
        name: 'Amara Wells',
        date: 'May 22, 2026',
        image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=120',
        body: 'The wedding morning timeline felt calm and organized. My hair, lashes, and lip color were checked in every kind of light before we left.'
      }
    ],
    faq: [
      ['Should I book a trial?', 'Yes. Trials are strongly recommended for bridal services so the final day feels predictable.'],
      ['Are lashes included?', 'Premium false lashes are included if they suit your chosen look.'],
      ['Can you support bridesmaids?', 'Yes. Group styling can be arranged based on party size and timing.']
    ],
    relatedServices: ['collagen-facial', 'nail-artistry', 'balayage']
  },
  {
    id: 'aromatherapy-massage',
    title: 'Aromatherapy Spa Massage',
    category: 'Spa Rituals',
    subtitle: 'Wellness Therapy Suite',
    metaTitle: 'Aromatherapy Spa Massage - NOVA Salon',
    metaDescription: 'Relax with NOVA Aromatherapy Massage featuring custom essential oils, pressure planning, wellness benefits, pricing, FAQs, and testimonials.',
    heroImage: './assets/images/img14.jpg',
    heroAlt: 'Aromatherapy massage spa treatment room',
    descriptionTitle: 'Scent, Pressure, and Recovery',
    description: [
      'Aromatherapy Spa Massage is a restorative full-body ritual using custom oil blends and measured pressure to help release tension, quiet the nervous system, and support recovery.',
      'Your therapist discusses pressure preferences, focus areas, and scent sensitivities before the session. The treatment is calm, structured, and tailored to the way your body feels that day.'
    ],
    gallery: [
      { src: './assets/images/img14.jpg', alt: 'Aromatherapy massage table setup' },
      { src: './assets/images/img6.jpg', alt: 'Essential oils for massage therapy' },
      { src: './assets/images/img22.jpg', alt: 'Relaxed wellness ritual setting' }
    ],
    benefits: [
      ['Stress Relief', 'A calm pace and selected oils support relaxation.'],
      ['Muscle Comfort', 'Focused pressure helps ease shoulder, neck, and back tension.'],
      ['Better Rest', 'Evening appointments can support a smoother sleep routine.'],
      ['Custom Oils', 'Blends are selected for your mood, preference, and sensitivity.']
    ],
    steps: [
      ['Wellness Check', 'Confirm pressure, focus areas, and scent preferences.'],
      ['Oil Selection', 'Choose a gentle blend for calm, clarity, or recovery.'],
      ['Therapeutic Massage', 'Use flowing pressure with targeted work where needed.'],
      ['Recovery Finish', 'End with hydration guidance and post-session care.']
    ],
    process: [
      'Arrive hydrated and avoid heavy meals immediately before the session.',
      'Tell your therapist about soreness, injury, pregnancy, or scent sensitivity.',
      'Plan a calm buffer afterward so the body can settle.'
    ],
    duration: '90 mins',
    pricing: {
      total: '$95.00',
      items: [
        ['Wellness Consultation and Oil Blend', '$20.00'],
        ['Full-Body Aromatherapy Massage', '$65.00'],
        ['Recovery Finish and Warm Towel', '$10.00']
      ]
    },
    rating: '4.9',
    reviewCount: '156',
    reviews: [
      {
        name: 'Daniel Park',
        date: 'August 4, 2026',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
        body: 'The pressure work through my shoulders was exactly right, and the lavender blend helped me sleep better that night.'
      },
      {
        name: 'Renee Clark',
        date: 'July 20, 2026',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120',
        body: 'A calm spa experience from start to finish. The therapist checked scent preferences, then built a massage that felt deeply restorative.'
      }
    ],
    faq: [
      ['Can I choose the oil blend?', 'Yes. Your therapist will recommend options and avoid any scent you dislike.'],
      ['Is deep pressure available?', 'Yes. Pressure can be adapted, but the service remains restorative rather than aggressive.'],
      ['How should I prepare?', 'Hydrate, arrive a few minutes early, and share any injuries or sensitivities before the session starts.']
    ],
    relatedServices: ['collagen-facial', 'luxury-haircut', 'nail-artistry']
  }
];

(function () {
  const serviceAliases = {
    facial: 'collagen-facial',
    'gel-manicure': 'nail-artistry',
    manicure: 'nail-artistry',
    massage: 'aromatherapy-massage',
    'spa-massage': 'aromatherapy-massage'
  };
  const byId = (id) => {
    const requestedId = String(id || '').trim();
    const canonicalId = serviceAliases[requestedId] || requestedId;
    return NOVA_SERVICES.find((service) => service.id === canonicalId) || NOVA_SERVICES[0];
  };
  const moneyToNumber = (value) => Number(String(value).replace(/[^0-9.]/g, '')) || 0;
  const stars = () => '<i class="fa-solid fa-star"></i>'.repeat(5);
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[char]);

  function serviceUrl(id) {
    const canonicalId = serviceAliases[String(id || '').trim()] || id;
    return `service-details.html?id=${encodeURIComponent(canonicalId)}`;
  }

  function normalizeReview(review) {
    if (Array.isArray(review)) {
      return {
        name: review[0],
        date: review[1],
        body: review[2],
        image: review[3] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'
      };
    }
    return {
      name: review.name,
      date: review.date,
      body: review.body,
      image: review.image,
      imageAlt: review.imageAlt
    };
  }

  function renderServiceDetails() {
    if (!/service-details\.html$/i.test(window.location.pathname)) return;

    const params = new URLSearchParams(window.location.search);
    const service = byId(params.get('id') || 'luxury-haircut');
    const meta = document.querySelector('meta[name="description"]');
    const hero = document.querySelector('section.relative.bg-stone-900');
    const contentSection = document.querySelector('section.py-24.max-w-7xl');
    if (!hero || !contentSection) return;

    document.title = service.metaTitle;
    if (meta) meta.setAttribute('content', service.metaDescription);

    const heroImg = hero.querySelector('img');
    const heroEyebrow = hero.querySelector('.relative span');
    const heroTitle = hero.querySelector('h1');
    const breadcrumbCurrent = hero.querySelector('.flex span.text-white');
    if (heroImg) {
      heroImg.src = service.heroImage;
      heroImg.alt = service.heroAlt;
    }
    if (heroEyebrow) heroEyebrow.textContent = service.subtitle;
    if (heroTitle) heroTitle.textContent = service.title;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = service.title;

    const left = contentSection.querySelector('[data-aos="fade-right"]');
    const aside = contentSection.querySelector('aside');
    if (!left || !aside) return;

    left.innerHTML = `
      <div class="space-y-6">
        <h2 class="font-serif text-3xl font-bold text-stone-900 dark:text-white">${esc(service.descriptionTitle)}</h2>
        ${service.description.map((paragraph) => `<p class="text-stone-500 dark:text-stone-400 leading-relaxed font-light">${esc(paragraph)}</p>`).join('')}
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        ${service.gallery.slice(0, 2).map((image) => `
          <div class="rounded-2xl overflow-hidden h-72 hover-img-zoom shadow">
            <img src="${esc(image.src)}" class="w-full h-full object-cover" alt="${esc(image.alt)}">
          </div>
        `).join('')}
      </div>

      <div class="space-y-6">
        <h3 class="font-serif text-2xl font-bold text-stone-900 dark:text-white">Service Benefits</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          ${service.benefits.map(([title, body]) => `
            <div class="flex gap-4 items-start">
              <span class="w-8 h-8 rounded-full bg-brand-rose/20 text-brand-roseDark flex items-center justify-center shrink-0 text-xs"><i class="fa-solid fa-check"></i></span>
              <div>
                <h4 class="font-serif font-bold text-lg mb-1">${esc(title)}</h4>
                <p class="text-stone-400 text-xs font-light">${esc(body)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="font-serif text-2xl font-bold text-stone-900 dark:text-white">Treatment Steps</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${service.steps.map(([title, body], index) => `
            <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl p-5">
              <span class="w-9 h-9 rounded-full bg-brand-gold text-white flex items-center justify-center text-xs font-bold mb-4">${index + 1}</span>
              <h4 class="font-serif text-lg font-bold text-stone-900 dark:text-white">${esc(title)}</h4>
              <p class="text-stone-500 dark:text-stone-400 text-xs leading-relaxed mt-2">${esc(body)}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="font-serif text-2xl font-bold text-stone-900 dark:text-white">Pricing Breakdown</h3>
        <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl p-6 divide-y divide-stone-100 dark:divide-brand-darkBorder">
          ${service.pricing.items.map(([label, price]) => `
            <div class="flex justify-between py-4 text-sm gap-4">
              <span class="font-bold">${esc(label)}</span>
              <span class="text-brand-gold font-bold shrink-0">${esc(price)}</span>
            </div>
          `).join('')}
          <div class="flex justify-between py-4 text-sm bg-brand-cream/45 dark:bg-brand-darkBg/40 px-2 rounded-lg gap-4">
            <span class="font-serif font-bold text-lg">Total Integrated Package</span>
            <span class="text-brand-gold font-serif text-lg font-bold shrink-0">${esc(service.pricing.total)}</span>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="font-serif text-2xl font-bold text-stone-900 dark:text-white">The NOVA Process</h3>
        <ul class="space-y-3">
          ${service.process.map((item) => `
            <li class="flex gap-3 text-sm text-stone-500 dark:text-stone-400">
              <i class="fa-solid fa-circle-check text-brand-gold mt-1"></i>
              <span>${esc(item)}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-stone-50 dark:bg-brand-darkCard/30 border border-stone-150 dark:border-brand-darkBorder rounded-2xl p-5">
          <span class="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Duration</span>
          <strong class="block font-serif text-2xl text-stone-900 dark:text-white mt-1">${esc(service.duration)}</strong>
        </div>
        <div class="bg-stone-50 dark:bg-brand-darkCard/30 border border-stone-150 dark:border-brand-darkBorder rounded-2xl p-5">
          <span class="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Starting Price</span>
          <strong class="block font-serif text-2xl text-brand-gold mt-1">${esc(service.pricing.total)}</strong>
        </div>
        <div class="bg-stone-50 dark:bg-brand-darkCard/30 border border-stone-150 dark:border-brand-darkBorder rounded-2xl p-5">
          <span class="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Reviews</span>
          <strong class="block font-serif text-2xl text-stone-900 dark:text-white mt-1">${esc(service.rating)} / 5</strong>
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="font-serif text-2xl font-bold text-stone-900 dark:text-white">Frequently Asked Questions</h3>
        <div class="space-y-4">
          ${service.faq.map(([question, answer]) => `
            <div class="faq-item border-b border-stone-150 dark:border-brand-darkBorder pb-4">
              <button class="faq-btn flex justify-between items-center w-full text-left font-serif font-bold text-lg text-stone-850 dark:text-white" type="button">
                <span>${esc(question)}</span>
                <i class="fa-solid fa-plus text-xs transition-transform duration-200"></i>
              </button>
              <div class="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
                <p class="text-stone-500 dark:text-stone-400 text-sm mt-3 leading-relaxed">${esc(answer)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="space-y-6">
        <h3 class="font-serif text-2xl font-bold text-stone-900 dark:text-white">Client Reviews</h3>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-stone-50 dark:bg-brand-darkCard/30 border border-stone-150 dark:border-brand-darkBorder rounded-2xl p-6">
          <div class="md:col-span-4 text-center">
            <span class="text-5xl font-serif font-bold text-brand-gold">${esc(service.rating)}</span>
            <div class="text-brand-gold text-sm my-2">${stars()}</div>
            <span class="text-xs text-stone-400">Based on ${esc(service.reviewCount)} Reviews</span>
          </div>
          <div class="md:col-span-8 space-y-2 text-xs">
            <div class="flex items-center gap-3">
              <span class="w-12 text-stone-400">5 Stars</span>
              <div class="flex-1 bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden"><div class="bg-brand-gold h-full w-[92%]"></div></div>
              <span class="w-8 text-right text-stone-400">92%</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-12 text-stone-400">4 Stars</span>
              <div class="flex-1 bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden"><div class="bg-brand-gold h-full w-[6%]"></div></div>
              <span class="w-8 text-right text-stone-400">6%</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-12 text-stone-400">3 Stars</span>
              <div class="flex-1 bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden"><div class="bg-brand-gold h-full w-[2%]"></div></div>
              <span class="w-8 text-right text-stone-400">2%</span>
            </div>
          </div>
        </div>
        <div class="space-y-6 divide-y divide-stone-100 dark:divide-brand-darkBorder">
          ${service.reviews.map((item) => {
            const review = normalizeReview(item);
            return `
            <div class="pt-6">
              <div class="flex justify-between items-start mb-3 gap-4">
                <div class="flex gap-3 items-center">
                  <img src="${esc(review.image)}" class="w-10 h-10 rounded-full object-cover shadow" alt="${esc(review.imageAlt || review.name)}">
                  <div>
                    <h5 class="font-bold text-sm">${esc(review.name)}</h5>
                    <span class="text-[10px] text-stone-400">${esc(review.date)}</span>
                  </div>
                </div>
                <div class="text-brand-gold text-xs shrink-0">${stars()}</div>
              </div>
              <p class="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">"${esc(review.body)}"</p>
            </div>
          `;
          }).join('')}
        </div>
      </div>
    `;

    aside.innerHTML = `
      <div class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl p-6 shadow-sm">
        <h4 class="font-serif text-lg font-bold mb-4 text-stone-900 dark:text-white">Related Services</h4>
        <ul class="space-y-3 text-sm">
          ${NOVA_SERVICES.map((item) => `
            <li>
              <a href="${serviceUrl(item.id)}" class="flex justify-between items-center py-2 px-3 ${item.id === service.id ? 'bg-brand-cream dark:bg-brand-darkBg text-brand-gold font-bold' : 'hover:bg-stone-50 dark:hover:bg-brand-darkBg'} rounded-lg transition-colors">
                <span class="flex items-center gap-2"><i class="fa-solid ${item.id === service.id ? 'fa-scissors' : 'fa-spa'} ${item.id === service.id ? '' : 'text-stone-400'}"></i> ${esc(item.title)}</span>
                <i class="fa-solid fa-chevron-right text-xs ${item.id === service.id ? '' : 'text-stone-400'}"></i>
              </a>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="bg-white dark:bg-brand-darkCard border-2 border-brand-gold rounded-2xl p-6 shadow-md">
        <h4 class="font-serif text-lg font-bold mb-2 text-stone-900 dark:text-white">Quick Booking</h4>
        <p class="text-[10px] text-stone-400 mb-4">Request your ${esc(service.title)} reservation slot below.</p>
        <form class="space-y-4" data-nova-form="appointment" data-service-id="${esc(service.id)}">
          <div>
            <label class="block text-[10px] uppercase tracking-wider font-semibold mb-1 text-stone-500">Name</label>
            <input name="name" type="text" required maxlength="70" class="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-lg focus:border-brand-gold focus:outline-none dark:text-white">
          </div>
          <div>
            <label class="block text-[10px] uppercase tracking-wider font-semibold mb-1 text-stone-500">Phone</label>
            <input name="phone" type="tel" required maxlength="20" class="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-lg focus:border-brand-gold focus:outline-none dark:text-white">
          </div>
          <div>
            <label class="block text-[10px] uppercase tracking-wider font-semibold mb-1 text-stone-500">Specialist</label>
            <select name="specialist" required class="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-lg focus:border-brand-gold focus:outline-none dark:text-white">
              <option value="">Select specialist</option>
              <option>Sophia Laurent</option>
              <option>Liam Thorne</option>
              <option>Emma Watson</option>
              <option>Mia Chen</option>
              <option>Any Available Stylist</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] uppercase tracking-wider font-semibold mb-1 text-stone-500">Appointment Date</label>
            <input name="date" type="date" required class="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-brand-darkBg border border-stone-150 dark:border-brand-darkBorder rounded-lg focus:border-brand-gold focus:outline-none dark:text-white">
          </div>
          <input name="service" type="hidden" value="${esc(service.title)}">
          <button type="submit" class="w-full py-3 bg-gradient-to-r from-brand-gold to-brand-goldDark text-white text-xs font-semibold rounded-lg hover:shadow transition-all">Submit Session Request</button>
        </form>
      </div>
    `;

    document.querySelectorAll('input[type="date"]').forEach((field) => {
      if (!field.min) field.min = new Date().toISOString().split('T')[0];
    });
  }

  window.NOVA_SERVICES = NOVA_SERVICES;
  window.NOVAServiceUrl = serviceUrl;
  document.addEventListener('DOMContentLoaded', renderServiceDetails);
})();
