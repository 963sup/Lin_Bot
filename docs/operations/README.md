# Operations status

P0/P1 defines no deployment, runtime infrastructure, production secrets or database. There is **no production rollout**.

Before P3 production readiness, choose a hosting platform and document environment separation, HTTPS webhook endpoint, secret rotation, backups (if persistence is added), error metrics, incident response and rollback. Do not imply a staging or production environment exists until deployed and verified.
