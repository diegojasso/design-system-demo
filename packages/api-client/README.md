# `@novo/api-client`

Shared API client utilities for Novo web apps.

## Usage

This package is intended for **server-side usage** in app code.

- Do not call upstream APIs directly from client components.
- Never expose API keys or sensitive headers to the browser.

## Current scope

- Insurance API client (used by `agent-portal`, intended to be reused by `q2b`).

## Configuration

Apps are responsible for providing environment-specific configuration (e.g., base URL and API key) from **server-only** environment variables.

