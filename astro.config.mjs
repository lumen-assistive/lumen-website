// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Lumen docs',
      description: 'Architecture, SDK reference, and contributor guides for Lumen.',
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
            { label: 'Architecture overview', slug: 'docs/introduction/architecture' },
            { label: 'Project status', slug: 'docs/introduction/status' },
          ],
        },
        {
          label: 'Getting started',
          items: [
            { label: 'Repository map', slug: 'docs/getting-started/repository-map' },
            { label: 'Running the app', slug: 'docs/getting-started/running-the-app' },
            { label: 'Running tests', slug: 'docs/getting-started/running-tests' },
          ],
        },
        {
          label: 'SDK reference',
          items: [
            { label: 'Plugin lifecycle', slug: 'docs/sdk/plugin-lifecycle' },
            { label: 'Event bus', slug: 'docs/sdk/event-bus' },
            { label: 'Model registry', slug: 'docs/sdk/model-registry' },
            { label: 'Versioning policy', slug: 'docs/sdk/versioning' },
          ],
        },
        {
          label: 'Contributing',
          items: [
            { label: 'Workflow and conventions', slug: 'docs/contributing/workflow' },
            { label: 'Building a plugin', slug: 'docs/contributing/plugins' },
            { label: 'Opening a pull request', slug: 'docs/contributing/pull-requests' },
          ],
        },
        {
          label: 'Privacy and safety',
          items: [
            { label: 'Data handling in detail', slug: 'docs/privacy/data-handling' },
            { label: 'Consent model', slug: 'docs/privacy/consent' },
            { label: 'Model and dataset licensing', slug: 'docs/privacy/licensing' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'FAQ', slug: 'docs/reference/faq' },
            { label: 'Benchmarks', slug: 'docs/reference/benchmarks' },
            { label: 'Glossary', slug: 'docs/reference/glossary' },
          ],
        },
      ],
    }),
  ],
});
