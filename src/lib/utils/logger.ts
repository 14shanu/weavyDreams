// export function logError(error: unknown, context?: string) {
//   if (process.env.NODE_ENV !== "production") {
//     console.error("[Error]" + (context ? \` \${context}\` : ""), error);
//   }
// }
export function logError(error: unknown, context?: string) {
  if (process.env.NODE_ENV !== "production") {
    console.error("[Error]" + (context ? ` ${context}` : ""), error);
  }
}
