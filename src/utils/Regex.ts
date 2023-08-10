export default function getNextPageSinceId(
  nextLink: string
): RegExpMatchArray | null {
  const regex: RegExp = /since=\d+/g;

  const since: RegExpMatchArray | null = nextLink.match(regex);

  if (since) {
    console.log(since); // Saída: ["since=123", "since=456"]
  } else {
    console.log('Nenhuma correspondência encontrada.');
  }

  return since;
}
