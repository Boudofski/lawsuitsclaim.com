# Content Update Process — LawsuitsClaim.com

## Why Updates Are Required

Legal information has expiration dates. Settlement deadlines pass. Laws change. Cases resolve. Class definitions are modified. Publishing outdated information — even unintentionally — can harm readers and damage editorial credibility.

## Article Categories by Update Frequency

### High-urgency (check monthly)
- Settlement explainer articles with specific deadlines
- Articles referencing a specific case that is still active
- Articles referencing regulatory rules that are under active change

### Medium-urgency (review quarterly)
- Articles covering specific consumer protection regulations (FTC rules, CFPB guidance)
- Insurance claim law overviews where state laws vary

### Low-urgency (annual review)
- Evergreen educational articles explaining general legal concepts
- Process explanations that do not reference specific deadlines

## Monitoring Sources

Set up Google Alerts for:
- "class action settlement deadline"
- Key case names referenced in articles
- "FTC [topic area] rule"
- "CFPB [topic area]"

Check monthly:
- PACER for status updates on cases referenced in articles
- Settlement administrator websites for deadline changes
- FTC press releases at ftc.gov/news-events/press-releases
- CPSC recall database at cpsc.gov/recalls

## Update Workflow

**Step 1: Identify outdated information**
Note what specifically changed — deadline, case outcome, regulatory update, new data.

**Step 2: Source the update**
Every material change must be backed by a primary source — court order, agency press release, settlement administrator notice, or official government publication.

**Step 3: Update the article**
Update the relevant section. Update the `updatedAt` field in frontmatter to today's date. Add an "Update note" at the top of the article if the change is significant: "Updated [Month Year]: [Brief description of what changed]."

**Step 4: Check internal links**
Ensure any internal links to the updated article from other articles still make sense in context.

**Step 5: Update the sitemap lastmod**
The sitemap automatically uses `updatedAt` from frontmatter — ensure it is updated.

## When to Unpublish vs. Update

**Update:** When the core topic remains relevant but specific details (deadlines, dollar amounts, case status) have changed.

**Add a note at the top:** When a major development has made the article partially outdated but the general information is still useful.

**Unpublish or redirect:** If the article refers to a settlement that has fully closed and the content has no evergreen value. Redirect to the category page.

## Tracking Updates

Maintain a simple editorial log in `docs/strategy/update-log.md` with columns: date, article slug, what was updated, source URL.
