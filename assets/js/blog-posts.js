const AURA_BLOG_POSTS = [
  {
    slug: 'haircut-trends',
    category: 'Hair Care',
    title: 'Top Haircut Trends For Everyday Salon Guests',
    author: 'Sophia Laurent',
    date: 'Jan 15, 2026',
    readTime: '6 Min Read',
    comments: '4 Comments',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=1200',
    thumb: './assets/images/img17.jpg',
    excerpt: 'Explore the most requested cuts, face-framing layers, and styling finishes guests are asking for this year.',
    intro: 'Modern salon guests want haircuts that move easily from morning routine to evening plans. The strongest looks this season combine soft structure, healthy ends, and styling that still feels natural after leaving the chair.',
    sections: [
      ['1. Soft Face-Framing Layers', 'Face-framing layers continue to be a favorite because they refresh the overall look without requiring a dramatic length change. They work beautifully with blowouts, air-dried waves, and polished ponytails.'],
      ['2. Healthy Ends First', 'The most expensive-looking haircut is always built on healthy ends. A precision trim, hydrating mask, and light finishing serum can make existing color and shape look immediately fresher.']
    ],
    quote: 'A great haircut should make daily styling feel easier, not more complicated.'
  },
  {
    slug: 'hair-color-aftercare',
    category: 'Hair Color',
    title: 'Essential Aftercare Tips For Fresh Hair Color',
    author: 'Liam Thorne',
    date: 'Jan 10, 2026',
    readTime: '5 Min Read',
    comments: '6 Comments',
    image: 'https://images.unsplash.com/photo-1605497746444-ac9dbd324d08?auto=format&fit=crop&q=80&w=1200',
    thumb: './assets/images/img16.jpg',
    excerpt: 'Learn professional aftercare habits to keep balayage, gloss, and highlights luminous between salon visits.',
    intro: 'Fresh color looks best when the hair cuticle is protected in the first few weeks after service. Small routine changes can preserve tone, shine, and softness until your next appointment.',
    sections: [
      ['1. Use Color-Safe Cleansers', 'Switch to sulfate-free shampoo and lukewarm water so pigments stay balanced and the gloss layer remains smooth.'],
      ['2. Add Weekly Moisture', 'A weekly mask helps color-treated hair stay flexible, reducing dullness and breakage around lighter pieces.']
    ],
    quote: 'Color aftercare is the difference between a beautiful first week and a beautiful full season.'
  },
  {
    slug: 'pre-facial-skin-prep',
    category: 'Skin Care',
    title: 'The Complete Guide To Pre-Facial Skin Prep',
    author: 'Emma Watson',
    date: 'Jan 05, 2026',
    readTime: '4 Min Read',
    comments: '3 Comments',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200',
    thumb: './assets/images/img18.jpg',
    excerpt: 'Discover how to prepare your skin before a facial so treatments absorb better and glow lasts longer.',
    intro: 'A facial works best when your skin arrives calm and ready for treatment. The goal is to avoid irritation and give your aesthetician a clear view of your natural skin condition.',
    sections: [
      ['1. Pause Harsh Exfoliation', 'Skip strong exfoliants and retinoids for at least two days before your appointment to reduce sensitivity.'],
      ['2. Come With Skin Notes', 'Bring notes about recent reactions, products, medications, and lifestyle changes so your treatment can be tailored precisely.']
    ],
    quote: 'Good prep lets your facial focus on progress instead of calming avoidable irritation.'
  },
  {
    slug: 'nail-care-routine',
    category: 'Nail Art',
    title: 'A Simple Nail Care Routine Between Salon Visits',
    author: 'Chloe Bennett',
    date: 'Feb 02, 2026',
    readTime: '5 Min Read',
    comments: '2 Comments',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=1200',
    thumb: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
    excerpt: 'Keep manicures glossy, cuticles soft, and nail beds healthy with a low-effort weekly routine.',
    intro: 'A polished manicure lasts longer when the nail plate and surrounding skin stay hydrated. Between appointments, the right home habits help protect shape, shine, and comfort.',
    sections: [
      ['1. Oil Cuticles Daily', 'A small drop of cuticle oil each night prevents dryness and makes gel or polish look fresher for longer.'],
      ['2. Protect With Gloves', 'Cleaning products and hot water can weaken polish adhesion, so use gloves during chores.']
    ],
    quote: 'Nail care does not need to be complicated; it needs to be consistent.'
  },
  {
    slug: 'bridal-makeup-timeline',
    category: 'Makeup',
    title: 'The Bridal Makeup Timeline Every Bride Should Know',
    author: 'Mia Chen',
    date: 'Feb 12, 2026',
    readTime: '7 Min Read',
    comments: '5 Comments',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=1200',
    thumb: './assets/images/img19.jpg',
    excerpt: 'Plan trials, skin prep, hair styling, and final touch-ups with a calm wedding-week beauty schedule.',
    intro: 'A beautiful bridal look is built well before the wedding morning. Trials, skin prep, and timing buffers create confidence when the day becomes busy.',
    sections: [
      ['1. Book A Trial Early', 'Schedule a makeup trial after dress and hair inspiration are clear so the final look feels cohesive.'],
      ['2. Keep Wedding Week Gentle', 'Avoid new active skincare, intense waxing, or last-minute color experiments right before the ceremony.']
    ],
    quote: 'The best bridal beauty timeline leaves room for calm.'
  },
  {
    slug: 'aromatherapy-benefits',
    category: 'Spa',
    title: 'How Aromatherapy Massage Supports Weekly Wellness',
    author: 'Emma Watson',
    date: 'Feb 22, 2026',
    readTime: '4 Min Read',
    comments: '4 Comments',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200',
    thumb: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600',
    excerpt: 'See how scent, touch, and gentle pressure can support relaxation, better sleep, and muscle recovery.',
    intro: 'Aromatherapy massage combines measured pressure with carefully selected essential oils. The result is a ritual that supports both physical comfort and mental reset.',
    sections: [
      ['1. Choose The Right Oil Blend', 'Lavender, citrus, eucalyptus, and herbal blends each set a different tone for the appointment.'],
      ['2. Make It A Recovery Habit', 'Monthly or biweekly sessions can help reduce recurring shoulder, neck, and back tension.']
    ],
    quote: 'Wellness becomes more powerful when it is scheduled before stress peaks.'
  },
  {
    slug: 'summer-skincare-glow',
    category: 'Skincare',
    title: '10 Skincare Secrets for Radiant Summer Glow',
    author: 'Emma Watson',
    date: 'July 28, 2026',
    readTime: '5 Min Read',
    comments: '3 Comments',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1200',
    thumb: './assets/images/img20.jpg',
    excerpt: 'Build a summer routine that keeps skin hydrated, balanced, and luminous in heat and humidity.',
    intro: 'Maintaining a healthy, radiant skin glow during summer requires more than general moisturizers. Heat, humidity, and sun exposure can change how your skin behaves day to day.',
    sections: [
      ['1. Hydrate From The Inside Out', 'Water, mineral balance, and light hydrating serums all support a plumper summer complexion.'],
      ['2. Switch To Lightweight Layers', 'Heavy creams can feel uncomfortable in humid weather, while gel textures and hyaluronic serums layer cleanly.']
    ],
    quote: 'Summer skin should feel protected, not overloaded.'
  },
  {
    slug: 'balayage-vs-highlights',
    category: 'Hair Color',
    title: 'Hair Balayage vs Highlights: The Full Guide',
    author: 'Sophia Laurent',
    date: 'August 2, 2026',
    readTime: '7 Min Read',
    comments: '6 Comments',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=1200',
    thumb: './assets/images/img21.jpg',
    excerpt: 'Compare color placement, maintenance needs, and finish so you can choose the right salon service.',
    intro: 'Balayage and highlights can both brighten hair beautifully, but they create different patterns, grow-out lines, and maintenance rhythms.',
    sections: [
      ['1. Balayage Looks Softer', 'Balayage is painted for a diffused, sunlit effect with softer regrowth.'],
      ['2. Highlights Add Brightness', 'Traditional highlights can create more lift from root to end and often deliver a brighter overall finish.']
    ],
    quote: 'The right color method depends on your lifestyle as much as your inspiration photo.'
  },
  {
    slug: 'wellness-habits',
    category: 'Lifestyle',
    title: '5 Wellness Habits to Master in 2026',
    author: 'Liam Thorne',
    date: 'August 5, 2026',
    readTime: '4 Min Read',
    comments: '2 Comments',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    thumb: './assets/images/img22.jpg',
    excerpt: 'Use small beauty and wellness rituals to create more energy, better recovery, and calmer routines.',
    intro: 'Wellness routines work best when they are small enough to repeat. A few thoughtful rituals can make salon care, home care, and rest feel connected.',
    sections: [
      ['1. Schedule Recovery Time', 'Treat massage, scalp care, and quiet rest as maintenance rather than emergency repair.'],
      ['2. Keep Beauty Notes', 'Tracking what works for your hair and skin makes each future appointment more effective.']
    ],
    quote: 'The most useful wellness habit is the one you can actually repeat.'
  }
];

function getNOVAPost(slug) {
  return AURA_BLOG_POSTS.find((post) => post.slug === slug) || AURA_BLOG_POSTS[0];
}

function getPostUrl(slug) {
  return `blog-post.html?post=${encodeURIComponent(slug)}`;
}

function renderNOVABlogGrid() {
  const grid = document.getElementById('blog-grid');
  const pagination = document.getElementById('blog-pagination');
  if (!grid || !pagination) return;

  const postsPerPage = 3;
  const totalPages = Math.ceil(AURA_BLOG_POSTS.length / postsPerPage);
  const params = new URLSearchParams(window.location.search);
  const requestedPage = Number(params.get('page')) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);
  const start = (currentPage - 1) * postsPerPage;
  const visiblePosts = AURA_BLOG_POSTS.slice(start, start + postsPerPage);

  grid.innerHTML = visiblePosts.map((post) => `
    <article class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-3xl overflow-hidden hover-img-zoom shadow-md hover:shadow-xl transition-all group flex flex-col justify-between">
      <div>
        <div class="h-64 overflow-hidden relative">
          <img src="${post.thumb}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="${post.title}">
        </div>
        <div class="p-8 space-y-4">
          <span class="inline-block bg-brand-gold text-stone-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">${post.category}</span>
          <h3 class="font-serif text-2xl font-bold text-stone-900 dark:text-white hover:text-brand-gold transition-colors leading-snug"><a href="${getPostUrl(post.slug)}">${post.title}</a></h3>
          <div class="flex items-center gap-4 text-[11px] text-stone-500 dark:text-stone-400">
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-user text-brand-gold"></i> ${post.author}</span>
            <span class="flex items-center gap-1.5"><i class="fa-regular fa-calendar text-brand-gold"></i> ${post.date}</span>
          </div>
          <p class="text-stone-600 dark:text-brand-darkText text-sm leading-relaxed font-light">${post.excerpt}</p>
        </div>
      </div>
      <div class="px-8 pb-8">
        <a href="${getPostUrl(post.slug)}" class="inline-block px-6 py-2.5 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-stone-950 rounded-full text-xs font-bold uppercase tracking-widest transition-all">READ MORE</a>
      </div>
    </article>
  `).join('');

  const pageLink = (page, label, isActive = false, isIcon = false) => `
    <a href="blog.html?page=${page}" class="w-10 h-10 rounded-full ${isActive ? 'bg-brand-gold text-stone-950' : 'border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:border-brand-gold hover:text-brand-gold'} flex items-center justify-center transition-colors font-bold text-sm">
      ${isIcon ? `<i class="fa-solid ${label} text-xs"></i>` : label}
    </a>
  `;

  const prevPage = currentPage === 1 ? 1 : currentPage - 1;
  const nextPage = currentPage === totalPages ? totalPages : currentPage + 1;

  pagination.innerHTML = [
    pageLink(prevPage, 'fa-chevron-left', false, true),
    ...Array.from({ length: totalPages }, (_, index) => {
      const page = index + 1;
      return pageLink(page, String(page), page === currentPage);
    }),
    pageLink(nextPage, 'fa-chevron-right', false, true)
  ].join('');
}

function renderNOVABlogPost() {
  const article = document.getElementById('blog-post-article');
  if (!article) return;

  const params = new URLSearchParams(window.location.search);
  const post = getNOVAPost(params.get('post') || AURA_BLOG_POSTS[0].slug);
  const relatedPosts = AURA_BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 2);

  document.title = `${post.title} - NOVA Blog`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.setAttribute('content', post.excerpt);

  document.getElementById('post-author').textContent = `Written by ${post.author}`;
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-date').innerHTML = `<i class="fa-regular fa-calendar mr-2"></i>${post.date}`;
  document.getElementById('post-read-time').innerHTML = `<i class="fa-regular fa-clock mr-2"></i>${post.readTime}`;
  document.getElementById('post-comments').innerHTML = `<i class="fa-regular fa-comment mr-2"></i>${post.comments}`;
  document.getElementById('post-image').src = post.image;
  document.getElementById('post-image').alt = post.title;
  document.getElementById('post-category').textContent = post.category;
  const heroBg = document.getElementById('post-hero-bg');
  if (heroBg) {
    heroBg.src = post.image;
    heroBg.alt = post.title;
  }

  article.innerHTML = `
    <p class="first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-brand-gold">${post.intro}</p>
    ${post.sections.map(([heading, body]) => `
      <h3 class="font-serif text-2xl font-bold text-stone-900 dark:text-white pt-4">${heading}</h3>
      <p>${body}</p>
    `).join('')}
    <blockquote class="border-l-4 border-brand-gold bg-stone-50 dark:bg-brand-darkCard p-6 rounded-r-2xl italic font-serif text-lg text-stone-850 dark:text-white">"${post.quote}"</blockquote>
  `;

  const tags = document.getElementById('post-tags');
  if (tags) {
    tags.innerHTML = [post.category, 'NOVA Salon', 'Beauty Tips'].map((tag) => `
      <span class="bg-stone-50 dark:bg-brand-darkCard px-3 py-1 rounded-full border border-stone-100 dark:border-brand-darkBorder text-stone-400">#${tag.toLowerCase().replace(/\s+/g, '')}</span>
    `).join('');
  }

  const related = document.getElementById('related-posts');
  if (related) {
    related.innerHTML = relatedPosts.map((item) => `
      <a href="${getPostUrl(item.slug)}" class="bg-white dark:bg-brand-darkCard border border-stone-150 dark:border-brand-darkBorder rounded-2xl overflow-hidden flex gap-4 group p-4 items-center shadow-sm">
        <img src="${item.thumb}" class="w-20 h-20 rounded-xl object-cover shrink-0" alt="${item.title}">
        <div>
          <h5 class="font-bold text-xs group-hover:text-brand-gold transition-colors leading-tight line-clamp-2">${item.title}</h5>
          <span class="text-[9px] text-stone-400 block mt-1">${item.date}</span>
        </div>
      </a>
    `).join('');
  }

  const recent = document.getElementById('recent-posts');
  if (recent) {
    recent.innerHTML = AURA_BLOG_POSTS.slice(0, 3).map((item) => `
      <a href="${getPostUrl(item.slug)}" class="flex gap-4 group">
        <img src="${item.thumb}" class="w-16 h-16 rounded-xl object-cover shrink-0" alt="${item.title}">
        <div>
          <h5 class="font-bold text-xs group-hover:text-brand-gold transition-colors leading-tight line-clamp-2">${item.title}</h5>
          <span class="text-[9px] text-stone-400 block mt-1">${item.date}</span>
        </div>
      </a>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderNOVABlogGrid();
  renderNOVABlogPost();
});
