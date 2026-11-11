<script>
  import { onMount, tick } from 'svelte';
  import { resolve } from '$app/paths';
  import { offerExpiresAt, scheduleOfferExpiry } from '$lib/onePageOffer.js';
  import QuoteFormSevenStep from '$lib/components/QuoteFormSevenStep.svelte';
  import '../../styles/40-quote.css';

  // Set to true to bring back the previous 7-step quote form.
  const USE_SEVEN_STEP_QUOTE_FORM = false;

  // Contiguous ranges: each one starts where the previous ends.
  const budgetOptions = [
    'Under $800',
    '$800–$1,500',
    '$1,500–$5,000',
    '$5,000–$20,000',
    '$20,000+',
    'Not sure yet'
  ];

  let submitted = $state(false);
  let isSubmitting = $state(false);
  let submitError = $state(false);
  let onePageOffer = $state(false);
  let promoCode = $derived(onePageOffer ? 'KAMBUR250' : '');

  onMount(() => {
    const params = new URLSearchParams(location.search);
    onePageOffer = Date.now() < offerExpiresAt &&
      (params.get('offer') === 'one-page-launch' ||
        params.get('promo') === 'KAMBUR250');
    return scheduleOfferExpiry(() => (onePageOffer = false));
  });

  let form = $state({
    name: '',
    email: '',
    websiteUrl: '',
    details: '',
    budget: '',
    _gotcha: ''
  });

  let touched = $state({
    name: false,
    email: false,
    websiteUrl: false,
    details: false
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlPattern = /^(https?:\/\/)?[^\s/.]+(\.[^\s/.]+)+(\/\S*)?$/i;

  let errors = $derived({
    name: form.name.trim() ? '' : 'Please enter your name.',
    email: !form.email.trim()
      ? 'Please enter your email address.'
      : emailPattern.test(form.email.trim())
        ? ''
        : 'Please enter a valid email address, like you@example.com.',
    websiteUrl: !form.websiteUrl.trim() || urlPattern.test(form.websiteUrl.trim())
      ? ''
      : 'Please enter a valid web address, like acme.co.',
    details: form.details.trim() ? '' : 'Please tell me a little about what you need.'
  });

  function showError(field) {
    return touched[field] && errors[field];
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    for (const field of Object.keys(touched)) touched[field] = true;

    const firstInvalid = Object.keys(touched).find((field) => errors[field]);
    if (firstInvalid) {
      await tick();
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    // Spam bots fill the hidden field; skip sending but show the normal thank-you.
    if (form._gotcha) {
      submitted = true;
      return;
    }

    const activeOffer = onePageOffer && Date.now() < offerExpiresAt;
    const submission = {
      name: form.name.trim(),
      email: form.email.trim(),
      websiteUrl: form.websiteUrl.trim(),
      details: form.details.trim(),
      budget: form.budget,
      _gotcha: form._gotcha,
      ...(activeOffer ? {
        promotion: 'One-Page Launch',
        promoCode,
        promotionReview: 'Pending manual review'
      } : {})
    };

    isSubmitting = true;
    submitError = false;

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

      window.gtag?.('event', 'generate_lead', {
        form_name: 'quote_form',
        budget: form.budget || 'not_provided'
      });

      submitted = true;
      await tick();

      document.querySelector('.quote-success-card')?.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'center'
      });
    } catch (error) {
      console.error(error);
      submitError = true;
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
    content="https://kamburcito.com/images/kamburcito-social-preview.webp"
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
    content="https://kamburcito.com/images/kamburcito-social-preview.webp"
  />
</svelte:head>

{#if USE_SEVEN_STEP_QUOTE_FORM}
  <QuoteFormSevenStep />
{:else}
<section class="quote-page">
    {#if submitted}
      <div class="quote-shell" role="status">

      <div class="quote-success-card">
        <p class="quote-status">Submitted</p>

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
          href={resolve('/')}
          class="quote-primary-button"
        >
          Back to Home
        </a>
      </div>
      </div>

    {:else}

      <div class="quote-form-inner">
        <header class="quote-form-intro">
          <h1>Tell me about your project.</h1>
        </header>

        <form class="quote-form-card" novalidate onsubmit={handleSubmit}>
          {#if onePageOffer}
            <p class="quote-promo-note">
              One-Page Launch · $250 USD
              <span>Promo code: <strong>{promoCode}</strong></span>
            </p>
          {/if}

          <div class="quote-step">

          <div class="quote-field">
            <label for="name">Your name *</label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              autocomplete="name"
              required
              bind:value={form.name}
              onblur={() => (touched.name = true)}
              aria-invalid={Boolean(showError('name'))}
              aria-describedby={[showError('name') ? 'name-error' : ''].filter(Boolean).join(' ') || undefined}
             />

            {#if showError('name')}
              <p id="name-error" class="quote-error">{errors.name}</p>
            {/if}
          </div>

          <div class="quote-field">
            <label for="email">Email address *</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autocomplete="email"
              required
              bind:value={form.email}
              onblur={() => (touched.email = true)}
              aria-invalid={Boolean(showError('email'))}
              aria-describedby={[showError('email') ? 'email-error' : ''].filter(Boolean).join(' ') || undefined}
             />

            {#if showError('email')}
              <p id="email-error" class="quote-error">{errors.email}</p>
            {/if}
          </div>

          <div class="quote-field">
            <label for="websiteUrl">Website URL</label>

            <p id="websiteUrl-help" class="quote-help">Optional, if you already have a site.</p>

            <input
              id="websiteUrl"
              name="websiteUrl"
              type="text"
              inputmode="url"
              placeholder="https://acme.co"
              autocomplete="url"
              bind:value={form.websiteUrl}
              onblur={() => (touched.websiteUrl = true)}
              aria-invalid={Boolean(showError('websiteUrl'))}
              aria-describedby={['websiteUrl-help', showError('websiteUrl') ? 'websiteUrl-error' : ''].filter(Boolean).join(' ') || undefined}
             />

            {#if showError('websiteUrl')}
              <p id="websiteUrl-error" class="quote-error">{errors.websiteUrl}</p>
            {/if}
          </div>

          <div class="quote-field">
            <label for="details">What do you need? *</label>

            <p id="details-help" class="quote-help">Please don't send confidential details.</p>

            <textarea
              id="details"
              name="details"
              rows="6"
              placeholder="Example: 3–5 page site for a local yoga studio, with a blog, contact form, and a unique design direction."
              required
              bind:value={form.details}
              onblur={() => (touched.details = true)}
              aria-invalid={Boolean(showError('details'))}
              aria-describedby={['details-help', showError('details') ? 'details-error' : ''].filter(Boolean).join(' ') || undefined}
            ></textarea>

            {#if showError('details')}
              <p id="details-error" class="quote-error">{errors.details}</p>
            {/if}
          </div>

          <div class="quote-field">
            <label for="budget">Budget</label>
            <p id="budget-help" class="quote-help">Optional.</p>
            <select id="budget" name="budget" aria-describedby="budget-help" bind:value={form.budget}>
              <option value="">Select a range</option>
              {#each budgetOptions as option (option)}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </div>

          <!-- Spam trap: hidden from people, filled in by bots. Formspree discards submissions where it is set. -->
          <div style="position: absolute; left: -9999px;" aria-hidden="true">
            <label for="_gotcha">Leave this field empty</label>
            <input id="_gotcha" name="_gotcha" type="text" tabindex="-1" autocomplete="off" bind:value={form._gotcha} />
          </div>
          </div>

          {#if submitError}
            <p class="quote-error" role="alert">
              Something went wrong. Please try again or email me directly at
              <a href="mailto:kamburcito@gmail.com">kamburcito@gmail.com</a>.
            </p>
          {/if}

          <div class="quote-actions">
            <button type="submit" class="quote-primary-button" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>

    {/if}
</section>
{/if}
