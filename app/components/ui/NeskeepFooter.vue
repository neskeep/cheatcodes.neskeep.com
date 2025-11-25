<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerLinks = [
  {
    title: 'Product',
    links: [
      { name: 'Cheatcodes', href: '/' },
      { name: 'Documentation', href: '#' },
      { name: 'API', href: '#' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Blog', href: '#' },
      { name: 'Guides', href: '#' },
      { name: 'Community', href: '#' },
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Careers', href: '#' },
    ]
  }
]

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/neskeep',
    icon: `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" fill="currentColor"/>`
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/neskeep',
    icon: `<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>`
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/neskeep',
    icon: `<path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="currentColor"/>`
  }
]
</script>

<template>
  <footer class="bg-[var(--color-bg-primary)] border-t border-[var(--color-border)]">
    <!-- Main footer content -->
    <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <!-- Brand section -->
        <div class="lg:col-span-2">
          <UiNeskeepLogo size="md" />
          <p class="mt-4 text-sm text-[var(--color-text-secondary)] max-w-md">
            Empowering developers with comprehensive, beautifully designed programming reference guides. Part of the Neskeep ecosystem.
          </p>

          <!-- Social links -->
          <div class="mt-6 flex items-center gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] hover:bg-[#00C9D4] hover:text-white transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,201,212,0.4)]"
              :title="social.name"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" v-html="social.icon" />
            </a>
          </div>
        </div>

        <!-- Link sections -->
        <div v-for="section in footerLinks" :key="section.title">
          <h4 class="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
            {{ section.title }}
          </h4>
          <ul class="space-y-3">
            <li v-for="link in section.links" :key="link.name">
              <a
                :href="link.href"
                class="text-sm text-[var(--color-text-secondary)] hover:text-[#00C9D4] transition-colors"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-[var(--color-border)]">
      <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Copyright -->
          <p class="text-sm text-[var(--color-text-muted)]">
            &copy; {{ currentYear }} Neskeep. All rights reserved.
          </p>

          <!-- Tech stack badge -->
          <div class="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <span>Built with</span>
            <span class="flex items-center gap-1.5">
              <span class="text-[#00DC82]">Nuxt</span>
              <span class="text-[var(--color-text-muted)]">+</span>
              <span class="text-[#38BDF8]">Tailwind</span>
              <span class="text-[var(--color-text-muted)]">+</span>
              <span class="text-[#00C9D4]">Shiki</span>
            </span>
          </div>

          <!-- Domain -->
          <a
            href="https://cheatcodes.neskeep.com"
            class="text-sm text-[#00C9D4] hover:underline"
          >
            cheatcodes.neskeep.com
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
