export function trackBehaviour(req, res, next) {
  if (req.user) {
    req.behaviourTracked = true;
  }
  return next();
}
