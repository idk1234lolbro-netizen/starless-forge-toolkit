export function diagnostic(severity, code, message, details = {}) {
  return { severity, code, message, details };
}

export function createResult(moduleName, group, diagnostics = [], metrics = {}) {
  return {
    ok: !diagnostics.some(d => d.severity === "error"),
    module: moduleName,
    object: group,
    diagnostics,
    metrics
  };
}
