export function formatPrecio(precio) {
  const partes = precio.toString().split(".");
  const integer = partes[0];
  const decimals = partes[1] || "00";

  return { integer, decimals };
}
