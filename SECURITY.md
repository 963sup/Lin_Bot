# Security policy

## Scope

Lin_Bot is at the engineering-foundation stage; there is no production LINE Bot deployment in this Repository.

## Reporting

Do not publish exploitable vulnerability details, credentials or personal data in public Issues. Use GitHub's private vulnerability reporting feature if enabled, or contact the maintainer privately.

## Secrets and privacy

- Keep `.env`, LINE Channel Secret, Channel Access Token, and cloud credentials outside Git.
- Use environment/secret management rather than committed configuration.
- Do not log raw message content or unredacted webhook payloads.
- Treat webhook signature verification, idempotency and privacy controls as blocking P2 concerns.

## Dependency policy

Keep direct dependencies and GitHub Actions reviewed and updated. No deployment automation exists in P0/P1.
