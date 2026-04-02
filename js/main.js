/* ============================================
   SLEEP APNEA CENTER — MAIN JAVASCRIPT
   ============================================ */

'use strict';

// ============================================
// NAVIGATION — Hamburger Toggle & Active Links
// ============================================
(function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.header');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && navLinks.classList.contains('open')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Highlight active nav link based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ============================================
// SMOOTH SCROLLING for anchor links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 70;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ============================================
// ARTICLES DATA & RENDERING
// ============================================
const articlesData = [
  {
    id: 1,
    title: 'Understanding Sleep Apnea: Causes, Symptoms & Diagnosis',
    category: 'Diagnosis',
    excerpt: 'Sleep apnea is a serious sleep disorder where breathing repeatedly stops and starts. Learn about the three types — obstructive, central, and complex — and how each is diagnosed.',
    author: 'Dr. Sarah Mitchell',
    date: 'March 15, 2024',
    readTime: '7 min read',
    image: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
    icon: '🫁'
  },
  {
    id: 2,
    title: 'CPAP vs. Oral Appliances: Which Treatment Is Right for You?',
    category: 'Treatment',
    excerpt: 'Two of the most popular treatments for obstructive sleep apnea are CPAP therapy and oral appliance therapy. We break down the pros, cons, and ideal candidates for each.',
    author: 'Dr. James Patel',
    date: 'February 28, 2024',
    readTime: '9 min read',
    image: 'linear-gradient(135deg, #0891B2 0%, #1E3A5F 100%)',
    icon: '😴'
  },
  {
    id: 3,
    title: 'Sleep Apnea in Children: Signs Parents Should Not Ignore',
    category: 'Children',
    excerpt: 'Pediatric sleep apnea is more common than you might think. Discover the warning signs, risk factors, and treatment options specifically for children ages 2 to 18.',
    author: 'Dr. Emily Torres',
    date: 'February 10, 2024',
    readTime: '6 min read',
    image: 'linear-gradient(135deg, #059669 0%, #0891B2 100%)',
    icon: '👶'
  },
  {
    id: 4,
    title: 'Lifestyle Changes to Combat Sleep Apnea Naturally',
    category: 'Lifestyle',
    excerpt: 'Weight loss, positional therapy, and dietary adjustments can significantly reduce sleep apnea severity. Explore evidence-based lifestyle interventions that make a real difference.',
    author: 'Dr. Karen Lee',
    date: 'January 22, 2024',
    readTime: '8 min read',
    image: 'linear-gradient(135deg, #7c3aed 0%, #2563EB 100%)',
    icon: '🏃'
  },
  {
    id: 5,
    title: 'The Link Between Sleep Apnea and Heart Disease',
    category: 'Research',
    excerpt: 'Growing research confirms a strong bidirectional relationship between sleep apnea and cardiovascular disease. Understand the mechanisms and why treating sleep apnea protects your heart.',
    author: 'Dr. Michael Chen',
    date: 'January 8, 2024',
    readTime: '10 min read',
    image: 'linear-gradient(135deg, #dc2626 0%, #1E3A5F 100%)',
    icon: '❤️'
  },
  {
    id: 6,
    title: 'How to Improve Sleep Quality: A Comprehensive Guide',
    category: 'Lifestyle',
    excerpt: 'Good sleep hygiene is foundational to managing sleep apnea. This guide covers sleep environment optimization, bedtime routines, and behavioral techniques endorsed by sleep specialists.',
    author: 'Dr. Sarah Mitchell',
    date: 'December 19, 2023',
    readTime: '8 min read',
    image: 'linear-gradient(135deg, #f59e0b 0%, #0891B2 100%)',
    icon: '🌙'
  }
];

(function initArticles() {
  const grid = document.getElementById('articlesGrid');
  const searchInput = document.getElementById('articleSearch');
  const categoryFilters = document.getElementById('categoryFilters');

  if (!grid) return;

  let currentFilter = 'All';
  let currentSearch = '';

  function createArticleCard(article) {
    return `
      <article class="article-card">
        <div class="article-card-image" style="background: ${article.image}">
          <span style="font-size:3.5rem;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.3))">${article.icon}</span>
        </div>
        <div class="article-card-body">
          <div class="article-meta">
            <span class="tag tag-blue">${article.category}</span>
            <span class="read-time">⏱ ${article.readTime}</span>
          </div>
          <h3>${article.title}</h3>
          <p>${article.excerpt}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:auto">
            <div style="font-size:0.825rem;color:var(--text-light)">
              <span>✍️ ${article.author}</span><br>
              <span>📅 ${article.date}</span>
            </div>
            <a href="#" class="btn btn-outline-primary btn-sm" aria-label="Read ${article.title}">Read More</a>
          </div>
        </div>
      </article>`;
  }

  function renderArticles() {
    const filtered = articlesData.filter(a => {
      const matchesCategory = currentFilter === 'All' || a.category === currentFilter;
      const search = currentSearch.toLowerCase();
      const matchesSearch = !search ||
        a.title.toLowerCase().includes(search) ||
        a.excerpt.toLowerCase().includes(search) ||
        a.author.toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-results" style="grid-column:1/-1">
          <div class="no-results-icon">🔍</div>
          <h3>No articles found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>`;
    } else {
      grid.innerHTML = filtered.map(createArticleCard).join('');
    }
  }

  // Category filter buttons
  if (categoryFilters) {
    categoryFilters.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        categoryFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderArticles();
      });
    });
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentSearch = searchInput.value;
      renderArticles();
    });
  }

  renderArticles();
})();

// ============================================
// NEWS DATA & RENDERING
// ============================================
const newsData = [
  {
    id: 1,
    headline: 'FDA Approves Revolutionary New CPAP Device with AI-Powered Pressure Adjustment',
    date: 'April 1, 2024',
    summary: 'The FDA has granted clearance to a next-generation CPAP device that uses artificial intelligence to automatically adjust pressure levels throughout the night, significantly improving patient comfort and compliance rates.',
    category: 'Technology',
    tags: ['FDA', 'CPAP', 'AI', 'Innovation'],
    color: 'linear-gradient(90deg, #2563EB, #3b82f6)'
  },
  {
    id: 2,
    headline: 'New Study Links Untreated Sleep Apnea to 30% Higher Risk of Type 2 Diabetes',
    date: 'March 20, 2024',
    summary: 'Researchers at Johns Hopkins University published findings showing that untreated obstructive sleep apnea significantly disrupts insulin sensitivity, raising the risk of developing Type 2 diabetes by nearly 30% over a decade.',
    category: 'Research',
    tags: ['Diabetes', 'Research', 'Health Risks', 'Metabolism'],
    color: 'linear-gradient(90deg, #0891B2, #06b6d4)'
  },
  {
    id: 3,
    headline: 'National Sleep Foundation Recommends Expanded Screening for Sleep Apnea in Primary Care',
    date: 'March 5, 2024',
    summary: 'The National Sleep Foundation released updated clinical guidelines urging primary care physicians to routinely screen all adult patients for obstructive sleep apnea, citing the high rate of undiagnosed cases — estimated at over 80% of sufferers.',
    category: 'Guidelines',
    tags: ['Screening', 'Primary Care', 'Guidelines', 'Prevention'],
    color: 'linear-gradient(90deg, #1E3A5F, #2563EB)'
  },
  {
    id: 4,
    headline: 'Sleep Apnea Center Partners with Major Insurance Providers to Expand Coverage',
    date: 'February 18, 2024',
    summary: 'In a landmark agreement, our Sleep Apnea Center has partnered with 12 major insurance providers to expand coverage for home sleep testing and oral appliance therapy, making treatment accessible to thousands more patients.',
    category: 'Center News',
    tags: ['Insurance', 'Coverage', 'Accessibility', 'Partnership'],
    color: 'linear-gradient(90deg, #059669, #10b981)'
  },
  {
    id: 5,
    headline: 'Breakthrough: Wearable Sensor Can Detect Sleep Apnea Episodes in Real Time',
    date: 'January 30, 2024',
    summary: 'Engineers at MIT have developed a thin, flexible wrist-worn sensor that can detect respiratory irregularities associated with sleep apnea with 94% accuracy, potentially enabling earlier diagnosis and continuous monitoring outside of clinical settings.',
    category: 'Technology',
    tags: ['Wearable', 'MIT', 'Sensor', 'Diagnosis'],
    color: 'linear-gradient(90deg, #7c3aed, #2563EB)'
  },
  {
    id: 6,
    headline: 'Pediatric Sleep Apnea Awareness Month: Key Facts Every Parent Should Know',
    date: 'January 12, 2024',
    summary: 'This January marks the third annual Pediatric Sleep Apnea Awareness Month. Leading sleep specialists share the top warning signs in children, from habitual snoring and restless sleep to behavioral changes and poor academic performance.',
    category: 'Awareness',
    tags: ['Children', 'Pediatric', 'Awareness', 'Prevention'],
    color: 'linear-gradient(90deg, #f59e0b, #ef4444)'
  }
];

(function initNews() {
  const newsGrid = document.getElementById('newsGrid');
  if (!newsGrid) return;

  function createNewsCard(item) {
    const tagsHtml = item.tags.map(t => `<span class="tag tag-blue">${t}</span>`).join('');
    return `
      <article class="news-card">
        <div class="news-card-accent" style="background:${item.color}"></div>
        <div class="news-card-body">
          <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.75rem">
            <span class="tag tag-teal">${item.category}</span>
            <span style="font-size:0.8rem;color:var(--text-light)">📅 ${item.date}</span>
          </div>
          <h3>${item.headline}</h3>
          <p>${item.summary}</p>
          <div class="tags-list">${tagsHtml}</div>
          <div style="margin-top:1rem">
            <a href="#" class="btn btn-outline-primary btn-sm" aria-label="Read full story: ${item.headline}">Read Full Story →</a>
          </div>
        </div>
      </article>`;
  }

  newsGrid.innerHTML = newsData.map(createNewsCard).join('');
})();

// ============================================
// FAQ DATA & RENDERING
// ============================================
const faqData = [
  {
    id: 1,
    question: 'What exactly is sleep apnea?',
    answer: 'Sleep apnea is a serious sleep disorder in which breathing repeatedly stops and starts during sleep. The most common type is obstructive sleep apnea (OSA), where the throat muscles relax and block the airway. Central sleep apnea occurs when the brain doesn\'t send proper signals to the muscles that control breathing. Complex sleep apnea syndrome is a combination of both types. Episodes can last from a few seconds to over a minute and may occur hundreds of times per night.'
  },
  {
    id: 2,
    question: 'What are the most common symptoms of sleep apnea?',
    answer: 'The most common symptoms include loud, persistent snoring; observed episodes of stopped breathing during sleep (often noted by a partner); gasping or choking sounds during sleep; waking with a dry mouth or sore throat; morning headaches; difficulty staying asleep (insomnia); excessive daytime sleepiness (hypersomnia); difficulty paying attention while awake; and irritability or mood changes. Not everyone with sleep apnea snores, so it\'s important to watch for other symptoms too.'
  },
  {
    id: 3,
    question: 'How is sleep apnea diagnosed?',
    answer: 'Sleep apnea is diagnosed through a sleep study, also called a polysomnogram. This can be done in a sleep lab where sensors monitor your brain activity, eye movements, heart rate, blood pressure, oxygen saturation, and breathing patterns while you sleep. Alternatively, a home sleep apnea test (HSAT) may be prescribed for straightforward cases of suspected obstructive sleep apnea. Your doctor will review your medical history, symptoms, and potentially perform a physical examination before recommending the appropriate test.'
  },
  {
    id: 4,
    question: 'Who is at risk for developing sleep apnea?',
    answer: 'Several factors increase the risk of sleep apnea: excess weight or obesity (fat deposits around the upper airway can obstruct breathing); neck circumference greater than 17 inches in men or 15 inches in women; a narrowed airway; being male (men are 2–3 times more likely than women); age over 40; family history; alcohol use; sedative or tranquilizer use; smoking; nasal congestion; and certain medical conditions like congestive heart failure, high blood pressure, or type 2 diabetes. Postmenopausal women and children with large tonsils are also at elevated risk.'
  },
  {
    id: 5,
    question: 'What is CPAP therapy and how does it work?',
    answer: 'CPAP stands for Continuous Positive Airway Pressure. It is the most common and effective treatment for moderate to severe obstructive sleep apnea. A CPAP machine delivers a steady stream of pressurized air through a mask worn over the nose or mouth while you sleep. This constant airflow keeps your throat open and prevents the breathing pauses characteristic of sleep apnea. Modern CPAP machines are quieter, smaller, and more comfortable than older models, with features like heated humidifiers, auto-adjusting pressure, and wireless connectivity for compliance tracking.'
  },
  {
    id: 6,
    question: 'Are there alternatives to CPAP therapy?',
    answer: 'Yes, several alternatives exist. Oral appliance therapy (OAT) uses a custom-fitted dental device that repositions the jaw and tongue to keep the airway open — suitable for mild to moderate OSA. Positional therapy helps those whose apnea worsens when lying on their back. Lifestyle changes such as weight loss, quitting smoking, and reducing alcohol can significantly reduce severity. Surgical options include uvulopalatopharyngoplasty (UPPP), jaw advancement, or hypoglossal nerve stimulation (Inspire therapy). The best alternative depends on your specific anatomy, apnea severity, and personal preferences.'
  },
  {
    id: 7,
    question: 'Can sleep apnea be cured?',
    answer: 'For most people, sleep apnea is a chronic condition that requires ongoing management rather than a one-time cure. However, significant improvement or even resolution is possible through lifestyle changes — particularly substantial weight loss — in some patients with obesity-related OSA. Children whose sleep apnea is caused by enlarged tonsils or adenoids often see complete resolution after tonsillectomy/adenoidectomy. Surgical interventions may provide long-term relief for carefully selected patients. For most adults, effective ongoing treatment with CPAP, oral appliances, or other therapies provides excellent symptom control and dramatically reduces health risks.'
  },
  {
    id: 8,
    question: 'What health risks are associated with untreated sleep apnea?',
    answer: 'Untreated sleep apnea carries serious health risks. Cardiovascular complications include high blood pressure, heart disease, heart attack, atrial fibrillation, and stroke — the repeated drops in oxygen stress the cardiovascular system. Metabolic effects include insulin resistance and a higher risk of type 2 diabetes. Mental health impacts include depression, anxiety, and cognitive impairment. Excessive daytime sleepiness increases the risk of traffic and workplace accidents. Liver function can be affected. Sleep apnea is also associated with complications during surgery and with medications. Early diagnosis and treatment can dramatically reduce all of these risks.'
  },
  {
    id: 9,
    question: 'Can children have sleep apnea?',
    answer: 'Yes, pediatric sleep apnea is relatively common, affecting an estimated 1–5% of children. In children, the most common cause is enlarged tonsils and/or adenoids. Obesity is also a significant risk factor. Signs in children may be different from adults — they may not snore loudly but may exhibit behavioral problems, difficulty concentrating, hyperactivity (often misdiagnosed as ADHD), poor academic performance, bedwetting, restless sleep, or unusual sleeping positions (like with their neck extended). Treatment often involves tonsillectomy/adenoidectomy, weight management, or CPAP therapy for more severe cases.'
  },
  {
    id: 10,
    question: 'Will my insurance cover sleep apnea testing and treatment?',
    answer: 'Most health insurance plans, including Medicare and Medicaid, cover sleep apnea testing and treatment when medically necessary, though coverage details vary by plan. Typically, insurers require documentation of symptoms, physician referral, and prior authorization for testing. In-lab polysomnograms are usually covered, and home sleep tests are increasingly covered as a more cost-effective alternative. CPAP machines, masks, and supplies are generally covered with proper documentation of compliance. Oral appliances may require additional documentation. We recommend contacting our billing team before your appointment — we can help verify your specific coverage and minimize out-of-pocket costs.'
  },
  {
    id: 11,
    question: 'How long does a home sleep test take, and what does it involve?',
    answer: 'A home sleep apnea test (HSAT) is designed to be simple and convenient. You\'ll be given a small portable device with sensors that typically monitor your airflow, breathing effort, blood oxygen level, and heart rate. You apply the sensors yourself at bedtime according to detailed instructions provided by our staff, sleep in your own bed as you normally would, and return the device the next morning. Results are typically available within a few business days. Home tests are generally recommended for adults with a high likelihood of moderate to severe obstructive sleep apnea without significant other medical conditions.'
  },
  {
    id: 12,
    question: 'How do I get started with treatment at your center?',
    answer: 'Getting started is simple. First, contact us to schedule an initial consultation — you can call, email, or use our online contact form. At your first appointment, a sleep specialist will review your symptoms, medical history, and any previous sleep studies. We may recommend a home sleep test or in-lab study. Once diagnosed, we\'ll work with you to develop a personalized treatment plan, which may include CPAP therapy, oral appliance therapy, lifestyle counseling, or other interventions. Our team will provide comprehensive follow-up care, including equipment support, compliance monitoring, and regular check-ins to ensure your treatment is working effectively.'
  }
];

(function initFAQ() {
  const faqContainer = document.getElementById('faqContainer');
  const faqSearchInput = document.getElementById('faqSearch');

  if (!faqContainer) return;

  let currentSearch = '';

  function createFaqItem(item) {
    return `
      <div class="faq-item" data-id="${item.id}">
        <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${item.id}">
          <span>${item.question}</span>
          <span class="faq-icon" aria-hidden="true">+</span>
        </button>
        <div class="faq-answer" id="faq-answer-${item.id}" role="region">
          <div class="faq-answer-content">${item.answer}</div>
        </div>
      </div>`;
  }

  function renderFAQ() {
    const search = currentSearch.toLowerCase();
    const filtered = search
      ? faqData.filter(f =>
          f.question.toLowerCase().includes(search) ||
          f.answer.toLowerCase().includes(search)
        )
      : faqData;

    if (filtered.length === 0) {
      faqContainer.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🔍</div>
          <h3>No FAQs found</h3>
          <p>Try a different search term.</p>
        </div>`;
    } else {
      faqContainer.innerHTML = filtered.map(createFaqItem).join('');
      attachFaqListeners();
    }
  }

  function attachFaqListeners() {
    faqContainer.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('active');

        // Close all other open items
        faqContainer.querySelectorAll('.faq-item.active').forEach(openItem => {
          openItem.classList.remove('active');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', () => {
      currentSearch = faqSearchInput.value;
      renderFAQ();
    });
  }

  renderFAQ();
})();

// ============================================
// CONTACT FORM VALIDATION
// ============================================
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const rules = {
    fullName: {
      el: () => form.querySelector('#fullName'),
      errorEl: () => form.querySelector('#fullNameError'),
      validate(val) {
        if (!val.trim()) return 'Full name is required.';
        if (val.trim().length < 2) return 'Name must be at least 2 characters.';
        return null;
      }
    },
    email: {
      el: () => form.querySelector('#email'),
      errorEl: () => form.querySelector('#emailError'),
      validate(val) {
        if (!val.trim()) return 'Email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email address.';
        return null;
      }
    },
    phone: {
      el: () => form.querySelector('#phone'),
      errorEl: () => form.querySelector('#phoneError'),
      validate(val) {
        if (!val.trim()) return null; // optional
        if (!/^[\+]?[\d\s\-\(\)]{7,15}$/.test(val.trim())) return 'Please enter a valid phone number.';
        return null;
      }
    },
    subject: {
      el: () => form.querySelector('#subject'),
      errorEl: () => form.querySelector('#subjectError'),
      validate(val) {
        if (!val || val === '') return 'Please select a subject.';
        return null;
      }
    },
    message: {
      el: () => form.querySelector('#message'),
      errorEl: () => form.querySelector('#messageError'),
      validate(val) {
        if (!val.trim()) return 'Message is required.';
        if (val.trim().length < 20) return 'Message must be at least 20 characters.';
        return null;
      }
    }
  };

  function showError(rule, message) {
    const el = rule.el();
    const errEl = rule.errorEl();
    if (!el || !errEl) return;
    el.classList.add('error');
    el.classList.remove('success');
    errEl.textContent = '⚠ ' + message;
    errEl.classList.add('visible');
  }

  function showSuccess(rule) {
    const el = rule.el();
    const errEl = rule.errorEl();
    if (!el || !errEl) return;
    el.classList.remove('error');
    el.classList.add('success');
    errEl.classList.remove('visible');
  }

  function clearState(rule) {
    const el = rule.el();
    const errEl = rule.errorEl();
    if (!el || !errEl) return;
    el.classList.remove('error', 'success');
    errEl.classList.remove('visible');
  }

  function validateField(key) {
    const rule = rules[key];
    const val = rule.el() ? rule.el().value : '';
    const error = rule.validate(val);
    if (error) {
      showError(rule, error);
      return false;
    } else {
      showSuccess(rule);
      return true;
    }
  }

  // Real-time validation on blur/input
  Object.keys(rules).forEach(key => {
    const el = rules[key].el();
    if (!el) return;
    el.addEventListener('blur', () => validateField(key));
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    Object.keys(rules).forEach(key => {
      if (!validateField(key)) isValid = false;
    });

    if (isValid) {
      showToast('✅', 'Message sent successfully! We will get back to you within 24 hours.');
      form.reset();
      Object.keys(rules).forEach(key => clearState(rules[key]));
    } else {
      // Scroll to first error
      const firstError = form.querySelector('.form-control.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }
  });
})();

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(icon, message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

// ============================================
// REPORTS — ANIMATED PROGRESS BARS
// ============================================
(function initReports() {
  const chartsSection = document.getElementById('reportsCharts');
  if (!chartsSection) return;

  const chartData = [
    {
      title: 'Treatment Effectiveness by Therapy Type',
      items: [
        { label: 'CPAP Therapy', value: 95, colorClass: 'bar-blue' },
        { label: 'Oral Appliance Therapy', value: 78, colorClass: 'bar-teal' },
        { label: 'Lifestyle Interventions', value: 55, colorClass: 'bar-green' },
        { label: 'Positional Therapy', value: 47, colorClass: 'bar-orange' },
        { label: 'Surgical Intervention', value: 72, colorClass: 'bar-navy' }
      ]
    },
    {
      title: 'Sleep Apnea Prevalence by Age Group',
      items: [
        { label: 'Ages 18–29', value: 12, colorClass: 'bar-teal' },
        { label: 'Ages 30–44', value: 28, colorClass: 'bar-blue' },
        { label: 'Ages 45–59', value: 48, colorClass: 'bar-navy' },
        { label: 'Ages 60–74', value: 65, colorClass: 'bar-orange' },
        { label: 'Ages 75+', value: 58, colorClass: 'bar-green' }
      ]
    },
    {
      title: 'Patient Satisfaction After Treatment',
      items: [
        { label: 'Improved Sleep Quality', value: 92, colorClass: 'bar-blue' },
        { label: 'Reduced Daytime Fatigue', value: 88, colorClass: 'bar-teal' },
        { label: 'Better Mood & Cognition', value: 81, colorClass: 'bar-green' },
        { label: 'Reduced Snoring', value: 94, colorClass: 'bar-navy' },
        { label: 'Overall Satisfaction', value: 89, colorClass: 'bar-orange' }
      ]
    }
  ];

  chartsSection.innerHTML = chartData.map(chart => `
    <div class="chart-container">
      <div class="chart-title">📊 ${chart.title}</div>
      ${chart.items.map(item => `
        <div class="progress-item">
          <div class="progress-label">
            <span>${item.label}</span>
            <span>${item.value}%</span>
          </div>
          <div class="progress-track">
            <div class="progress-bar ${item.colorClass}" data-value="${item.value}" style="width:0%"></div>
          </div>
        </div>`).join('')}
    </div>`).join('');

  // Animate progress bars when they enter the viewport
  function animateBars(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.progress-bar[data-value]').forEach(bar => {
          const val = bar.getAttribute('data-value');
          requestAnimationFrame(() => {
            bar.style.width = val + '%';
          });
        });
        observer.unobserve(entry.target);
      }
    });
  }

  const observer = new IntersectionObserver(animateBars, { threshold: 0.3 });
  chartsSection.querySelectorAll('.chart-container').forEach(c => observer.observe(c));
})();

// ============================================
// NEWSLETTER FORM (FOOTER)
// ============================================
document.querySelectorAll('.newsletter-form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (input && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      showToast('📧', 'Thank you for subscribing to our newsletter!');
      input.value = '';
    } else if (input) {
      input.style.borderColor = 'var(--error)';
      setTimeout(() => { input.style.borderColor = ''; }, 2000);
    }
  });
});

// ============================================
// INTERSECTION OBSERVER — Fade-in animation
// ============================================
(function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const style = document.createElement('style');
  style.textContent = `
    .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  const animatables = document.querySelectorAll(
    '.service-card, .article-card, .team-card, .stat-card, .testimonial-card, .value-card, .finding-card, .report-card, .news-card'
  );

  animatables.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animatables.forEach(el => observer.observe(el));
})();
