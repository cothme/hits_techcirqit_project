# HITS React Integration Guide

## Overview

Your React application has been updated to individually display hot issues and similar cases using data from your n8n workflow. The application now features modern card-based layouts that provide better visualization and user experience.

## New Components Added

### 1. HotIssueCard.tsx
- Individual card display for each hot issue
- Shows priority indicators based on case count
- Displays all hot issue details in an organized layout
- Action buttons for viewing details and related cases

### 2. CaseCard.tsx
- Individual card display for each case
- Shows hot issue analysis with confidence scores
- Displays problem descriptions, solutions, and reasoning
- Color-coded confidence indicators and category badges

### 3. HotIssuesGrid.tsx
- Grid layout for displaying multiple hot issue cards
- Toggle between grid and table views
- Responsive design for different screen sizes
- Loading states and error handling

### 4. SimilarCasesGrid.tsx
- Grid layout for displaying case cards
- Extracts and processes data from n8n workflow responses
- Shows analysis summary with statistics
- Handles different response formats from the workflow

### 5. TestIntegration.tsx
- Testing component for verifying n8n integration
- Test individual endpoints or run all tests
- Display environment variables and response data
- Useful for debugging and development

## Data Flow

### Hot Issues
1. Dashboard loads → `useGetHotIssues` hook triggered
2. Hook calls n8n webhook: `VITE_WEB_HOOK_LIST_HOT_ISSUE_PROD`
3. Data processed and displayed in `HotIssuesGrid` or `HotIssuesTable`
4. Each hot issue rendered as individual `HotIssueCard`

### Similar Cases Search
1. User enters search query → `useSearchCase` hook triggered
2. Hook calls n8n webhook: `VITE_WEB_HOOK_SEARCH_CASE_TEST`
3. Response processed by `SimilarCasesGrid`
4. Cases extracted from response and rendered as `CaseCard` components

## n8n Workflow Integration

### Webhook Endpoints
- **Hot Issues**: `http://localhost:5678/webhook/8d31865a-95cf-45ff-8749-cc4f411cbd7c`
- **Search Cases**: `http://localhost:5678/webhook-test/5f913fa5-cc97-4869-8e72-2dba67b81b75`

### Expected Data Structure

#### Hot Issues Response
```json
[
  {
    "title": "Hot issue title",
    "issueId": "HI-123",
    "product": "Maximum Security",
    "caseOwners": "John Doe",
    "totalCaseCounts": "5",
    "lastCaseReported": "2024-01-15",
    "status": "Open",
    "rootCause": "Root cause description",
    "latestUpdate": "Latest update info",
    "dateReported": "2024-01-10"
  }
]
```

#### Search Cases Response
```json
[
  {
    "matchCount": 2,
    "query": "installation problem",
    "matches": [
      {
        "caseId": "TM-1234567",
        "caseTitle": "Installation Issue",
        "activityOwner": "Jane Smith",
        "product": "Internet Security",
        "problemDescription": "Customer can't install software",
        "problemCategory": "Install / Uninstall",
        "rootCause": "Registry conflict",
        "solutionThatWorked": "Registry cleanup",
        "likelyRelatedHotIssue": "HI-42 — Installation failures",
        "reasoning": "Similar installation error patterns",
        "confidenceScore": 0.85
      }
    ]
  }
]
```

## Features

### Visual Enhancements
- **Card-based Layout**: Modern, responsive card design
- **Priority Indicators**: Color-coded borders based on case counts
- **Confidence Scores**: Visual progress bars for AI confidence
- **Status Badges**: Color-coded status indicators
- **Category Tags**: Organized problem categorization

### User Experience
- **Grid/Table Toggle**: Switch between card grid and table views
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on all screen sizes
- **Interactive Elements**: Hover effects and animations

### Data Processing
- **Smart Extraction**: Handles various n8n response formats
- **Data Validation**: Ensures required fields are present
- **Fallback Values**: Graceful handling of missing data
- **Type Safety**: TypeScript interfaces for data structure

## Testing the Integration

### Using the Test Component
1. Temporarily add `TestIntegration` to your Dashboard:
```tsx
import TestIntegration from "../components/TestIntegration";

// Add in your Dashboard component
<TestIntegration />
```

2. Start your n8n instance and React app
3. Use the test buttons to verify endpoints
4. Check browser console for detailed logs

### Manual Testing
1. Start n8n: Make sure your workflow is active
2. Start React app: `npm run dev`
3. Test hot issues loading on page load
4. Test search functionality with various queries

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure n8n allows requests from your React app origin
   - Check n8n settings for allowed origins

2. **Webhook Not Found**
   - Verify webhook IDs in `.env` file match n8n workflow
   - Ensure workflow is active in n8n

3. **Data Structure Issues**
   - Use TestIntegration component to inspect response format
   - Check browser network tab for actual API responses
   - Verify n8n workflow output format matches expected structure

4. **Environment Variables**
   - Ensure `.env` file is in project root
   - Restart React app after changing `.env` variables
   - Variables must start with `VITE_` prefix

### Debug Steps
1. Check browser console for errors
2. Inspect network requests in browser dev tools
3. Verify n8n workflow execution logs
4. Use the TestIntegration component
5. Check that all environment variables are set correctly

## Next Steps

1. **Customize Styling**: Modify card designs to match your brand
2. **Add More Actions**: Implement "View Details" and "Related Cases" buttons
3. **Enhanced Filtering**: Add filters for status, product, etc.
4. **Real-time Updates**: Consider WebSocket integration for live updates
5. **Export Features**: Add CSV/PDF export functionality
6. **Analytics Dashboard**: Create charts and graphs for trend analysis

## File Structure
```
src/
├── components/
│   ├── HotIssueCard.tsx        # Individual hot issue display
│   ├── CaseCard.tsx            # Individual case display
│   ├── HotIssuesGrid.tsx       # Grid layout for hot issues
│   ├── SimilarCasesGrid.tsx    # Grid layout for cases
│   └── TestIntegration.tsx     # Testing component
├── interfaces/
│   ├── hotIssue.ts            # Updated hot issue interface
│   └── case.ts                # Updated case interface
├── utils/
│   └── testN8nIntegration.ts  # Testing utilities
└── api/
    └── n8n.ts                 # Updated API functions
```