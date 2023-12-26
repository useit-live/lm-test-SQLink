const highlightMatches = (title: string, content: string, matches: { indices: [number, number][] }[]) => {
  // Sort matches by indices for correct processing
  const sortedMatches = matches.sort((a, b) => a.indices[0][0] - b.indices[0][0]);

  const fragments = []; // Array to store text fragments
  let lastIndex = 0; // Keep track of the last index processed

  // Loop through matches and build text fragments
  sortedMatches.forEach((match) => {
    const [startIndex, endIndex] = match.indices[0];
    // Push non-matching text
    fragments.push(title.substring(lastIndex, startIndex));
    // Push matching text wrapped in <mark> element
    fragments.push(<mark key={startIndex} style={{ backgroundColor: 'red', color: 'white' }}>
      {title.substring(startIndex, endIndex + 1)}
    </mark>);
    // Update lastIndex
    lastIndex = endIndex + 1;
  });

  // Add any remaining text after the last match
  fragments.push(title.substring(lastIndex));

  // Return the combined array as a React fragment
  return (
    <div className="border rounded my-1 p-1">
      <h3 className="text-xl font-bold">
        {fragments}
      </h3>
      <p className="text-sm">{content}</p>
    </div>);
};

// Define your component that will render highlighted text
const HighlightedText = ({ title, content, matches }: {
  title: string;
  content: string;
  matches: { indices: [number, number][] }[]
}) => {
  if (matches && matches.length > 0) {
    return highlightMatches(title, content, matches);
  }
  // Return the original text if there are no matches
  return (
    <div className="border rounded my-1 p-1">
      <h3 className="text-xl font-bold">
        {title}
      </h3>
      <p className="text-sm">{content}</p>
    </div>
  );
};

export default HighlightedText;