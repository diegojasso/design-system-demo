/**
 * Calculate fuzzy match score between text and query
 * Returns a score between 0 and 1, where 1 is a perfect match
 */
export function fuzzyMatch(text: string, query: string): number {
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()

  // Exact match = highest priority
  if (lowerText === lowerQuery) {
    return 1.0
  }

  // Starts with = very high priority
  if (lowerText.startsWith(lowerQuery)) {
    return 0.9
  }

  // Contains = high priority
  if (lowerText.includes(lowerQuery)) {
    return 0.7
  }

  // Fuzzy match (characters in order) = medium priority
  let queryIndex = 0
  let consecutiveMatches = 0
  let maxConsecutive = 0

  for (let i = 0; i < lowerText.length && queryIndex < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[queryIndex]) {
      consecutiveMatches++
      maxConsecutive = Math.max(maxConsecutive, consecutiveMatches)
      queryIndex++
    } else {
      consecutiveMatches = 0
    }
  }

  // If all query characters were found in order
  if (queryIndex === lowerQuery.length) {
    // Score based on how many consecutive matches we found
    const consecutiveScore = maxConsecutive / lowerQuery.length
    return 0.3 + consecutiveScore * 0.2 // Range: 0.3 - 0.5
  }

  // No match
  return 0
}

/**
 * Calculate match score for a command item
 * Takes into account label, keywords, and shortcut
 */
export function calculateCommandScore(
  command: {
    label: string
    keywords: string[]
    shortcut?: string
  },
  query: string
): number {
  const lowerQuery = query.toLowerCase()

  // Check label match
  const labelScore = fuzzyMatch(command.label, lowerQuery)

  // Check keyword matches
  const keywordScores = command.keywords.map((keyword) =>
    fuzzyMatch(keyword, lowerQuery)
  )
  const maxKeywordScore = Math.max(...keywordScores, 0)

  // Check shortcut match (exact match only)
  let shortcutScore = 0
  if (command.shortcut) {
    const shortcutText = command.shortcut.toLowerCase().replace(/[⌘ctrl]/g, "")
    if (shortcutText === lowerQuery || shortcutText.includes(lowerQuery)) {
      shortcutScore = 0.8
    }
  }

  // Return the highest score
  return Math.max(labelScore, maxKeywordScore, shortcutScore)
}

/**
 * Custom filter function for cmdk
 * Returns a number between 0 and 1 indicating match quality
 */
export function commandFilter(value: string, search: string): number {
  if (!search) {
    return 1 // Show all when no search
  }

  const lowerSearch = search.toLowerCase()
  const lowerValue = value.toLowerCase()

  // Exact match
  if (lowerValue === lowerSearch) {
    return 1
  }

  // Starts with
  if (lowerValue.startsWith(lowerSearch)) {
    return 0.9
  }

  // Contains
  if (lowerValue.includes(lowerSearch)) {
    return 0.7
  }

  // Fuzzy match
  return fuzzyMatch(lowerValue, lowerSearch)
}
