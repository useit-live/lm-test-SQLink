const highlightMatches = (text: string, matches: { indices: [number, number][] }[]) => {
  // Sort matches by indices for correct processing
  const sortedMatches = matches.sort((a, b) => a.indices[0][0] - b.indices[0][0]);

  const fragments = []; // Array to store text fragments
  let lastIndex = 0; // Keep track of the last index processed

  // Loop through matches and build text fragments
  sortedMatches.forEach((match) => {
    const [startIndex, endIndex] = match.indices[0];
    // Push non-matching text
    fragments.push(text.substring(lastIndex, startIndex));
    // Push matching text wrapped in <mark> element
    fragments.push(<mark key={startIndex} style={{ backgroundColor: 'red', color: 'white' }}>
      {text.substring(startIndex, endIndex + 1)}
    </mark>);
    // Update lastIndex
    lastIndex = endIndex + 1;
  });

  // Add any remaining text after the last match
  fragments.push(text.substring(lastIndex));

  // Return the combined array as a React fragment
  return <>{fragments}</>;
};

// Define your component that will render highlighted text
const HighlightedText = ({ text, matches }: { text: string; matches: { indices: [number, number][] }[] }) => {
  if (matches && matches.length > 0) {
    return highlightMatches(text, matches);
  }

  // Return the original text if there are no matches
  return <>{text}</>;
};

export default HighlightedText;