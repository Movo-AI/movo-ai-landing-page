import {
  englishDataset,
  englishRecommendedTransformers,
  RegExpMatcher,
} from "obscenity";

const matcher = new RegExpMatcher({
  ...englishDataset.build(),
  ...englishRecommendedTransformers,
});

const containsUnsafeLanguage = (value: string | undefined | null) => {
  if (!value) return false;
  return matcher.hasMatch(value);
};

const containsUnsafeLanguageInFields = (
  fields: Array<string | undefined | null>
) => containsUnsafeLanguage(fields.filter(Boolean).join(" "));

export { containsUnsafeLanguage, containsUnsafeLanguageInFields };
