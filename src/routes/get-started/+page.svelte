<script>
  import { tick } from 'svelte';
  import '../../styles/40-quote.css';

  const purposeOptions = [
    'Get leads or inquiries',
    'Allow customers to book appointments',
    'Sell products / accept payments',
    'Publish articles or updates',
    'Edit pages or content myself',
    'Display my work'
  ];

  const budgetOptions = [
    'Under $800',
    '$1,500–$5,000',
    '$5,000–$20,000',
    '$20,000+',
    'Not sure yet'
  ];

  const sizeOptions = [
    '1 page / landing page',
    '3–5 pages',
    '6–10 pages',
    '10+ pages',
    'Not sure yet'
  ];

  const designOptions = [
    'Yes — include a design phase',
    'No — skip design to reduce cost',
    'Not sure yet'
  ];

  let currentStep = $state(0);
  let submitted = $state(false);
  let isSubmitting = $state(false);

  let touched = $state({
    companyName: false,
    details: false,
    name: false,
    email: false
  });

  let form = $state({
    companyName: '',
    websiteUrl: '',
    purpose: [],
    budget: '',
    size: '',
    designPhase: '',
    details: '',
    name: '',
    email: ''
  });

  const totalSteps = 7;

  let progress = $derived(
    Math.round(((currentStep + 1) / totalSteps) * 100)
  );

  let canContinue = $derived(
    currentStep === 0
      ? form.companyName.trim().length > 0
      : currentStep === 1
        ? form.purpose.length > 0
        : currentStep === 2
          ? form.budget.length > 0
          : currentStep === 3
            ? form.size.length > 0
            : currentStep === 4
              ? form.designPhase.length > 0
              : currentStep === 5
                ? form.details.trim().length > 0
                : currentStep === 6
                  ? form.name.trim().length > 0 &&
                    form.email.trim().length > 0
                  : false
  );

  function togglePurpose(option) {
    if (form.purpose.includes(option)) {
      form.purpose = form.purpose.filter((item) => item !== option);
    } else {
      form.purpose = [...form.purpose, option];
    }
  }

  function nextStep() {
    if (!canContinue || isSubmitting) return;

    if (currentStep < totalSteps - 1) {
      currentStep += 1;
    } else {
      submitForm();
    }
  }

  function previousStep() {
    if (currentStep > 0 && !isSubmitting) {
      currentStep -= 1;
    }
  }

  async function submitForm() {
    const submission = {
      companyName: form.companyName,
      websiteUrl: form.websiteUrl,
      purpose: form.purpose.join(', '),
      budget: form.budget,
      size: form.size,
      designPhase: form.designPhase,
      details: form.details,
      name: form.name,
      email: form.email
    };

    isSubmitting = true;

    try {
      const response = await fetch('https://formspree.io/f/xnjkrzbz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(submission)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      submitted = true;
      await tick();

      document.querySelector('.quote-success-card')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    } catch (error) {
      console.error(error);
      alert(
        'Something went wrong. Please try again or email me directly.'
      );
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Request a Website Quote | Kamburcito Studio</title>

  <meta
    name="description"
    content="Tell Kamburcito Studio about your website project and receive a personalized proposal based on your goals and scope."
  />

  <link
    rel="canonical"
    href="https://kamburcito.com/get-started/"
  />

  <meta property="og:type" content="website" />

  <meta
    property="og:title"
    content="Request a Website Quote | Kamburcito Studio"
  />

  <meta
    property="og:description"
    content="Share your project details and receive a personalized website proposal."
  />

  <meta
    property="og:url"
    content="https://kamburcito.com/get-started/"
  />

  <meta
    property="og:image"
    content="https://kamburcito.com/images/kamburcito-social-preview.jpg"
  />

  <meta
    name="twitter:card"
    content="summary_large_image"
  />

  <meta
    name="twitter:title"
    content="Request a Website Quote | Kamburcito Studio"
  />

  <meta
    name="twitter:description"
    content="Share your project details and receive a personalized website proposal."
  />

  <meta
    name="twitter:image"
    content="https://kamburcito.com/images/kamburcito-social-preview.jpg"
  />
</svelte:head>

<section class="quote-page">
  <div class="quote-shell">
    {#if submitted}

      <div class="quote-success-card">
        <p class="eyebrow">Submitted</p>

        <h1>
          Your project details
          <span>were sent.</span>
        </h1>

        <p>
          Thank you for sharing your project. I’ll review your answers
          and follow up with next steps if we’re a good fit.
          You should hear back within 24–48 hours.
        </p>

        <a
          href="/"
          class="quote-primary-button"
        >
          Back to Home
        </a>
      </div>

    {:else}

      <div class="quote-intro-card">
        <p class="eyebrow">Get Started</p>

        <h1>
          Get a welcome package
          <span>+ custom quote.</span>
        </h1>

        <p>
          Answer a few questions and I’ll immediately receive your
          project details. If we’re a good fit, I’ll follow up with
          a focused proposal.
        </p>

        <small>Estimated time: 1–2 minutes</small>
      </div>

      <div class="quote-progress-card">
        <div class="quote-progress-top">
          <span>
            Progress ({currentStep + 1}/{totalSteps})
          </span>

          <span>{progress}%</span>
        </div>

        <div class="quote-progress-track">
          <div
            class="quote-progress-fill"
            style={`width: ${progress}%`}
          ></div>
        </div>
      </div>

      <div class="quote-form-card">

        {#if currentStep === 0}

          <h2>Project</h2>

          <div class="quote-field">
            <label for="companyName">
              Website or company name *
            </label>

            <input
              id="companyName"
              type="text"
              placeholder="Acme Co"
              bind:value={form.companyName}
              onblur={() => (touched.companyName = true)}
              aria-invalid={
                touched.companyName &&
                !form.companyName.trim()
              }
              aria-describedby={
                touched.companyName &&
                !form.companyName.trim()
                  ? 'companyName-error'
                  : undefined
              }
            />

            {#if touched.companyName && !form.companyName.trim()}
              <p
                id="companyName-error"
                class="quote-error"
              >
                This field is required.
              </p>
            {/if}
          </div>

          <div class="quote-field">
            <label for="websiteUrl">
              Website URL
            </label>

            <p class="quote-help">
              Optional, if you already have a site.
            </p>

            <input
              id="websiteUrl"
              type="url"
              placeholder="https://acme.co"
              bind:value={form.websiteUrl}
            />
          </div>

        {/if}


        {#if currentStep === 1}

          <h2>Purpose</h2>

          <p class="quote-help large">
            Select everything that applies. This helps me understand
            the purpose and complexity of your website.
          </p>

          <div class="quote-field">
            <p class="quote-question">
              What do you need your website to do? *
            </p>

            <p class="quote-help">
              Choose all that apply.
            </p>

            <div class="quote-options">
              {#each purposeOptions as option}

                <button
                  type="button"
                  class:selected={form.purpose.includes(option)}
                  aria-pressed={form.purpose.includes(option)}
                  onclick={() => togglePurpose(option)}
                >
                  <span></span>
                  {option}
                </button>

              {/each}
            </div>
          </div>

        {/if}


        {#if currentStep === 2}

          <h2>Budget</h2>

          <div class="quote-field">
            <p class="quote-question">
              What budget range are you considering? *
            </p>

            <p class="quote-help">
              I make websites from focused one-pagers to more complex
              custom builds. Knowing your approximate budget helps me
              shape a realistic proposal.
            </p>

            <div class="quote-options">
              {#each budgetOptions as option}

                <button
                  type="button"
                  class:selected={form.budget === option}
                  aria-pressed={form.budget === option}
                  onclick={() => (form.budget = option)}
                >
                  <span></span>
                  {option}
                </button>

              {/each}
            </div>
          </div>

        {/if}


        {#if currentStep === 3}

          <h2>Website size</h2>

          <p class="quote-help large">
            This helps estimate project complexity instantly.
          </p>

          <div class="quote-field">
            <p class="quote-question">
              Roughly how large will the website be? *
            </p>

            <div class="quote-options">
              {#each sizeOptions as option}

                <button
                  type="button"
                  class:selected={form.size === option}
                  aria-pressed={form.size === option}
                  onclick={() => (form.size = option)}
                >
                  <span></span>
                  {option}
                </button>

              {/each}
            </div>
          </div>

        {/if}


        {#if currentStep === 4}

          <h2>Dedicated Design Phase</h2>

          <div class="quote-field">
            <p class="quote-question">
              Do you want a dedicated design phase? *
            </p>

            <p class="quote-help">
              A design phase includes custom mockups before
              development. This helps your brand stand out with a
              unique website direction. Skipping this step can reduce
              cost, but the site may feel more template-based.
            </p>

            <div class="quote-options">
              {#each designOptions as option}

                <button
                  type="button"
                  class:selected={form.designPhase === option}
                  aria-pressed={form.designPhase === option}
                  onclick={() => (form.designPhase = option)}
                >
                  <span></span>
                  {option}
                </button>

              {/each}
            </div>
          </div>

        {/if}


        {#if currentStep === 5}

          <h2>Website details</h2>

          <p class="quote-help large">
            This helps me understand your goals, structure,
            and any special requirements.
          </p>

          <div class="quote-field">
            <label for="details">
              Briefly describe your website *
            </label>

            <p class="quote-help">
              What is the site for? Pages, features, integrations,
              inspiration, etc.
            </p>

            <textarea
              id="details"
              rows="6"
              placeholder="Example: 3–5 page site for a local yoga studio, with a blog, contact form, and a unique design direction."
              bind:value={form.details}
              onblur={() => (touched.details = true)}
              aria-invalid={
                touched.details &&
                !form.details.trim()
              }
              aria-describedby={
                touched.details &&
                !form.details.trim()
                  ? 'details-error'
                  : undefined
              }
            ></textarea>

            {#if touched.details && !form.details.trim()}
              <p
                id="details-error"
                class="quote-error"
              >
                This field is required.
              </p>
            {/if}
          </div>

        {/if}


        {#if currentStep === 6}

          <h2>
            Where should I send your welcome package?
          </h2>

          <p class="quote-help large">
            I’ll email you a custom overview with next steps based on
            your answers. Your privacy is protected and you’ll only be
            contacted about this submission.
          </p>

          <div class="quote-field">
            <label for="name">
              Your name *
            </label>

            <input
              id="name"
              type="text"
              placeholder="Jane Doe"
              bind:value={form.name}
              onblur={() => (touched.name = true)}
              aria-invalid={
                touched.name &&
                !form.name.trim()
              }
              aria-describedby={
                touched.name &&
                !form.name.trim()
                  ? 'name-error'
                  : undefined
              }
            />

            {#if touched.name && !form.name.trim()}
              <p
                id="name-error"
                class="quote-error"
              >
                This field is required.
              </p>
            {/if}
          </div>

          <div class="quote-field">
            <label for="email">
              Email address *
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              bind:value={form.email}
              onblur={() => (touched.email = true)}
              aria-invalid={
                touched.email &&
                !form.email.trim()
              }
              aria-describedby={
                touched.email &&
                !form.email.trim()
                  ? 'email-error'
                  : undefined
              }
            />

            {#if touched.email && !form.email.trim()}
              <p
                id="email-error"
                class="quote-error"
              >
                This field is required.
              </p>
            {/if}
          </div>

        {/if}

      </div>


      <div class="quote-actions">

        <button
          type="button"
          class="quote-secondary-button"
          onclick={previousStep}
          disabled={currentStep === 0 || isSubmitting}
        >
          Back
        </button>

        <button
          type="button"
          class="quote-primary-button"
          onclick={nextStep}
          disabled={!canContinue || isSubmitting}
        >
          {#if isSubmitting}
            Sending...
          {:else if currentStep === totalSteps - 1}
            Submit
          {:else}
            Next
          {/if}
        </button>

      </div>

    {/if}
  </div>
</section>