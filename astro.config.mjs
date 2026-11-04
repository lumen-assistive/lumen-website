// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/moduli/': '/modules/',
    '/en/': '/',
    '/en/modules/': '/modules/',
    '/en/privacy/': '/privacy/',
    '/en/sdk/': '/sdk/',
    '/en/download/': '/download/',
  },
  integrations: [
    starlight({
      title: 'Lumen docs',
      description: 'Architecture, app guide, plugin and SDK reference, server, design system and contributor guides for Lumen.',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/lumen-assistive' },
      ],
      customCss: ['./src/styles/docs.css'],
      editLink: {
        baseUrl: 'https://github.com/lumen-assistive/lumen-website/edit/main/',
      },
      sidebar: [
        {
          label: 'Introduction',
          items: [
            { label: 'What is Lumen', slug: 'docs/introduction/what-is-lumen' },
            { label: 'Who Lumen is for', slug: 'docs/introduction/who-is-it-for' },
            { label: 'Design principles', slug: 'docs/introduction/principles' },
            { label: 'Architecture overview', slug: 'docs/introduction/architecture' },
            { label: 'Project status', slug: 'docs/introduction/status' },
            { label: 'Roadmap', slug: 'docs/introduction/roadmap' },
          ],
        },
        {
          label: 'Getting started',
          items: [
            { label: 'Repository map', slug: 'docs/getting-started/repository-map' },
            { label: 'Development setup', slug: 'docs/getting-started/development-setup' },
            { label: 'Running the app', slug: 'docs/getting-started/running-the-app' },
            { label: 'Running tests', slug: 'docs/getting-started/running-tests' },
            { label: 'CI workflows', slug: 'docs/getting-started/ci-workflows' },
          ],
        },
        {
          label: 'Architecture',
          items: [
            { label: 'Data flow', slug: 'docs/architecture/data-flow' },
            { label: 'Data model', slug: 'docs/architecture/data-model' },
            { label: 'Dependency pinning', slug: 'docs/architecture/dependency-pinning' },
            { label: 'Design decisions', slug: 'docs/architecture/design-decisions' },
            { label: 'Known limitations', slug: 'docs/architecture/limitations' },
          ],
        },
        {
          label: 'App guide',
          items: [
            { label: 'App overview', slug: 'docs/app/overview' },
            { label: 'Onboarding', slug: 'docs/app/onboarding' },
            { label: 'UI modes', slug: 'docs/app/ui-modes' },
            { label: 'Settings', slug: 'docs/app/settings' },
            { label: 'Navigation and routing', slug: 'docs/app/navigation' },
            { label: 'Storage', slug: 'docs/app/storage' },
            { label: 'Text and localization', slug: 'docs/app/localization' },
            { label: 'Diagnostics screen', slug: 'docs/app/diagnostics' },
            {
              label: 'Module screens',
              items: [
              { label: 'Vision screen', slug: 'docs/app/modules/vision' },
              { label: 'Hearing screen', slug: 'docs/app/modules/hearing' },
              { label: 'Safety screen', slug: 'docs/app/modules/safety' },
              { label: 'Family screen', slug: 'docs/app/modules/family' },
              { label: 'Speech screen', slug: 'docs/app/modules/speech' },
              { label: 'Reading screen', slug: 'docs/app/modules/reading' },
              { label: 'Memory screen', slug: 'docs/app/modules/memory' },
              { label: 'Mobility screen', slug: 'docs/app/modules/mobility' },
              ],
            },
          ],
        },
        {
          label: 'Plugin packages',
          items: [
            { label: 'Plugin packages overview', slug: 'docs/plugins/overview' },
            { label: 'Common patterns', slug: 'docs/plugins/common-patterns' },
            { label: 'Vision package', slug: 'docs/plugins/vision' },
            { label: 'Hearing package', slug: 'docs/plugins/hearing' },
            { label: 'Safety package', slug: 'docs/plugins/safety' },
            { label: 'Family package', slug: 'docs/plugins/family' },
            { label: 'Speech package', slug: 'docs/plugins/speech' },
            { label: 'Reading package', slug: 'docs/plugins/reading' },
            { label: 'Memory package', slug: 'docs/plugins/memory' },
            { label: 'Mobility package', slug: 'docs/plugins/mobility' },
          ],
        },
        {
          label: 'SDK reference',
          items: [
            { label: 'Plugin lifecycle', slug: 'docs/sdk/plugin-lifecycle' },
            { label: 'Plugin manifest', slug: 'docs/sdk/plugin-manifest' },
            { label: 'Capabilities', slug: 'docs/sdk/capabilities' },
            { label: 'Plugin context', slug: 'docs/sdk/plugin-context' },
            { label: 'Event bus', slug: 'docs/sdk/event-bus' },
            { label: 'Event catalog', slug: 'docs/sdk/events' },
            { label: 'Model registry', slug: 'docs/sdk/model-registry' },
            { label: 'Testing fakes', slug: 'docs/sdk/testing' },
            { label: 'Example plugin', slug: 'docs/sdk/example-plugin' },
            { label: 'Writing a plugin step by step', slug: 'docs/sdk/writing-a-plugin' },
            { label: 'Versioning policy', slug: 'docs/sdk/versioning' },
          ],
        },
        {
          label: 'Core reference',
          items: [
            { label: 'Core overview', slug: 'docs/core/overview' },
            { label: 'InMemoryEventBus', slug: 'docs/core/event-bus' },
            { label: 'LocalModelRegistry', slug: 'docs/core/model-registry' },
            { label: 'PluginManager', slug: 'docs/core/plugin-manager' },
            { label: 'CapabilityGate', slug: 'docs/core/capability-gate' },
            { label: 'ConsentStore', slug: 'docs/core/consent-store' },
            { label: 'Errors and states', slug: 'docs/core/errors' },
          ],
        },
        {
          label: 'Server reference',
          items: [
            { label: 'Server overview', slug: 'docs/server/overview' },
            { label: 'Endpoints', slug: 'docs/server/endpoints' },
            { label: 'Authentication', slug: 'docs/server/authentication' },
            { label: 'Server data model', slug: 'docs/server/data-model' },
            { label: 'Configuration and deployment', slug: 'docs/server/deployment' },
            { label: 'Server security notes', slug: 'docs/server/security-notes' },
          ],
        },
        {
          label: 'Models',
          items: [
            { label: 'Models overview', slug: 'docs/models/overview' },
            { label: 'License ledger', slug: 'docs/models/license-ledger' },
            { label: 'Compliance gate', slug: 'docs/models/compliance-gate' },
            { label: 'Conversion pipeline', slug: 'docs/models/conversion-pipeline' },
            { label: 'Benchmark harness', slug: 'docs/models/benchmark-harness' },
            { label: 'Command line', slug: 'docs/models/cli' },
          ],
        },
        {
          label: 'Design system',
          items: [
            { label: 'Design system overview', slug: 'docs/design/overview' },
            { label: 'Colors', slug: 'docs/design/colors' },
            { label: 'Typography', slug: 'docs/design/typography' },
            { label: 'Module colors', slug: 'docs/design/module-colors' },
            { label: 'Components', slug: 'docs/design/components' },
            { label: 'Layout, shape and motion', slug: 'docs/design/layout-and-motion' },
            { label: 'Accessibility targets', slug: 'docs/design/accessibility-targets' },
            { label: 'Screenshots', slug: 'docs/design/screenshots' },
          ],
        },
        {
          label: 'Accessibility',
          items: [
            { label: 'Accessibility overview', slug: 'docs/accessibility/overview' },
            { label: 'WCAG approach', slug: 'docs/accessibility/wcag-approach' },
            { label: 'Manual accessibility testing', slug: 'docs/accessibility/manual-testing' },
          ],
        },
        {
          label: 'Privacy and safety',
          items: [
            { label: 'Data handling in detail', slug: 'docs/privacy/data-handling' },
            { label: 'Consent model', slug: 'docs/privacy/consent' },
            { label: 'What leaves the device', slug: 'docs/privacy/what-leaves-the-device' },
            { label: 'Encryption at rest', slug: 'docs/privacy/encryption-at-rest' },
            { label: 'Model and dataset licensing', slug: 'docs/privacy/licensing' },
          ],
        },
        {
          label: 'Contributing',
          items: [
            { label: 'Workflow and conventions', slug: 'docs/contributing/workflow' },
            { label: 'Code style', slug: 'docs/contributing/code-style' },
            { label: 'Commit conventions', slug: 'docs/contributing/commit-conventions' },
            { label: 'Building a plugin', slug: 'docs/contributing/plugins' },
            { label: 'Opening a pull request', slug: 'docs/contributing/pull-requests' },
            { label: 'Documentation guide', slug: 'docs/contributing/documentation-guide' },
            { label: 'Release process', slug: 'docs/contributing/release-process' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'FAQ', slug: 'docs/reference/faq' },
            { label: 'Troubleshooting', slug: 'docs/reference/troubleshooting' },
            { label: 'Command cheat sheet', slug: 'docs/reference/commands' },
            { label: 'Module matrix', slug: 'docs/reference/module-matrix' },
            { label: 'Glossary', slug: 'docs/reference/glossary' },
            { label: 'Benchmarks', slug: 'docs/reference/benchmarks' },
          ],
        },
      ],
    }),
  ],
});
