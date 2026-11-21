<script>
  /**
   * Shared-link preview (Open Graph + Twitter card) image tags and og:site_name.
   * Pages keep their own title, description, og:type and og:url.
   */
  /** @type {{ share: { image: string, imageAlt: string } }} */
  let { share } = $props();
</script>

<svelte:head>
  <meta property="og:site_name" content="Kamburcito Studio" />
  <meta property="og:image" content={share.image} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:alt" content={share.imageAlt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={share.image} />
  <meta name="twitter:image:alt" content={share.imageAlt} />
</svelte:head>
