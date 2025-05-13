// CSS styles will be injected via a <style> tag
export const GlobalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
    .generate-schedule-form { 
        font-family: 'Cairo', sans-serif; 
        font-size: 13px; 
        direction: rtl; /* Added for RTL layout */
        color: #000; /* Default text color to black */
    }
    .vertical-text {
        writing-mode: vertical-rl; transform: rotate(180deg); white-space: nowrap;
        text-align: center; padding: 2px; font-weight: bold; font-size: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1.2;
        direction: rtl ; /* Corrected typo: dirction -> direction */
    }
    .vertical-text .location-text {
        font-size: 0.8em;
        opacity: 0.85;
        margin-top: 1px;
    }
    .vertical-main-group-name {
        writing-mode: vertical-rl; transform: rotate(180deg); white-space: nowrap;
        text-align: center; padding: 4px 2px; font-weight: bold; font-size: 13px;
        display: flex; align-items: center; justify-content: center; height: 100%;
    }
    .lecture-cell, .section-cell { font-weight: 500; height: 100%; }
    .day-selector label span { padding: 3px 6px; font-size: 0.75rem; border-radius: 0.25rem; cursor:pointer; margin-left: 2px; margin-right: 2px; border: 1px solid transparent;}
    .day-selector label input:checked + span {
        background-color: #3b82f6; /* bg-blue-500 */
        color: white;
        border-color: #3b82f6; /* border-blue-500 */
    }
    .day-selector label span { /* Default border for unchecked */
        border: 1px solid #d1d5db; /* border-gray-300 */
    }

    .section-range-input input { width: 50px; }
    [data-tooltip] { position: relative; } /* Needed for tooltip positioning context */
    [data-tooltip]:hover::after { content: attr(data-tooltip); position: absolute; background-color: #333; color: white; padding: 6px 10px; border-radius: 4px; z-index: 100; white-space: pre-line; font-size: 0.8rem; bottom: 100%; left: 50%; transform: translateX(-50%) translateY(-5px); min-width: 200px; text-align: right;}
    .time-input-form-group input[type="number"] { width: 60px; }
    .time-input input[type="number"] { width: 45px; padding: 0.25rem 0.375rem; }
    .time-input select { padding: 0.25rem 0.375rem; font-size: 0.75rem; }
    .merged-cell { display: flex; align-items: center; justify-content: center; height: 100%; min-height: 28px; }
    
    table { border-collapse: collapse; width: 100%; margin-bottom: 1rem; }
    th, td { border: 1px solid #cbd5e1; padding: 1px; text-align: center; vertical-align: middle; min-height: 28px; font-size: 0.7rem;}
    th { padding: 3px; background-color: #f9fafb; font-size: 0.75rem;} /* Default th text color will be black from body */
    .time-header { min-width: 40px; font-size: 0.6rem; padding: 2px; }

    .sticky-col-main-group {
        position: -webkit-sticky; position: sticky; right: 0px; /* Correct for RTL */
        background-color: #dbeafe; z-index: 12; padding: 0 !important;
        min-width: 35px;
        font-weight: bold;
    }
     .sticky-col-section {
        position: -webkit-sticky; position: sticky; /* 'right' will be set dynamically for RTL */
        background-color: white; z-index: 11;
        padding: 2px !important; min-width: 28px; font-size: 0.65rem;
    }
    th.sticky-header { position: -webkit-sticky; position: sticky; top: 0; background-color: #3b82f6; color: white; z-index: 20; }
    th.sticky-time-header { position: -webkit-sticky; position: sticky; /* top will be set dynamically */ background-color: #f3f4f6; z-index: 19; } /* Text color will be black */
    
    /* Using classes on TD directly instead of :has for broader compatibility */
    /* Text color inside these cells will be black by default from body */
    td.has-lecture-cell { background-color: #BFDBFE; border: 1px solid #a5b4fc; }
    td.has-section-cell { background-color: #BBF7D0; border: 1px solid #86efac; }
    
    .form-section-title { font-size: 1.1rem; }
    .group-item { padding: 1rem; }
    #scheduleOutputContainer.hidden { display: none !important; } 
    .hidden-cell { display: none !important; }
    .segment-title { /* display: none; */ /* Kept visible for React version */ text-align:center; font-weight:bold; font-size: 1.1rem; margin: 0.5rem 0;}
    .table-container { width: 100%; overflow-x: auto; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); margin-bottom: 0.5rem; }

    @media print {
        body { font-size: 7pt !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; margin:0; padding:0; color: #000 !important; } /* Ensure black text for print */
        .container.mx-auto.px-4.py-8 { margin: 0 !important; padding: 0 !important; max-width: 100% !important; }
        #scheduleForm, .print-hide, .fixed.top-4.right-4, .bg-white.rounded-xl.shadow-lg.p-6.md\\:p-8.max-w-5xl.mx-auto, button#fillSampleData, button#generateSchedule, button#saveTable, .gettable { display: none !important; }
        #scheduleOutputContainer { display: block !important; box-shadow: none !important; padding: 0 !important; margin: 0 !important; max-width: 100% !important; width:100% !important; }
        .table-container { box-shadow: none !important; margin-bottom: 5px !important; overflow: visible !important; width: 100% !important; page-break-inside: avoid; }
        table { width: 100% !important; table-layout: fixed; border-collapse: collapse !important; margin-bottom: 5px !important; page-break-inside: avoid; }
        table th, table td {
            border: 0.5px solid #999 !important; 
            padding: 0px 1px !important; 
            font-size: 3pt !important; 
            min-height: auto !important;
            height: 1%; 
            overflow-wrap: break-word; 
            word-break: break-all;
            vertical-align: middle;
            color: #000 !important; /* Ensure all table text is black for print */
        }
        table th { background-color: #eaeaea !important; color: #000 !important; font-weight:bold; }
        .sticky-col-main-group, .sticky-col-section, th.sticky-header, th.sticky-time-header {
            position: static !important; 
        }
        .sticky-col-main-group { background-color: #e0e7ff !important; }
        .sticky-col-section { background-color: #f3f4f6 !important; }
        .vertical-text, .vertical-main-group-name {
            writing-mode: horizontal-tb !important; transform: none !important;
            white-space: normal !important; 
            font-size: 6pt !important; 
            padding: 0px !important;
            line-height: 1.1;
            display: block;
            text-align:center !important;
            color: #000 !important;
        }
         .vertical-text .location-text {
            display: block;
            font-size: 0.9em !important;
            opacity: 1 !important;
            margin-top: 0px;
        }
        .time-header , .sticky-col-section{
            font-size: 10px !important;
        }
        .vertical-main-group-name{
            font-size: 7pt !important; /* Adjusted from original 25px for print */
        }
        th.sticky-header{ 
            font-size: 15px !important;
            color: #000 !important; /* Header text black for print */
            background-color: #eaeaea !important;
        }
        .lecture-cell .vertical-text{ 
            writing-mode: vertical-rl !important;
            transform: rotate(180deg) !important;
            font-size: 10pt !important; 
        }
        td.has-lecture-cell { background-color: #dbeafe !important; border: 0.5px solid #9ca3af !important;}
        td.has-section-cell { background-color: #dcfce7 !important; border: 0.5px solid #9ca3af !important;}
        .merged-cell { min-height: auto !important; padding: 0px !important; display: flex; align-items: center; justify-content: center; height: 100%;}
        #universityInfoForTable { text-align:center; font-size: 8pt !important; margin-bottom: 3px !important; font-weight:bold; }
        .schedule-segment { page-break-inside: avoid; margin-bottom: 10px; }
        @page { size: A4 landscape; margin: 0.3cm; }
    }

    /* Tailwind-like utility classes from the original HTML - will be used as global classes */
    .container { width: 100%; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
    .p-6 { padding: 1.5rem; }
    .md\\:p-8 { padding: 2rem; } 
    .p-4 { padding: 1rem; }
    .p-2 { padding: 0.5rem; }
    .md\\:p-4 { padding: 1rem; }
    .mb-6 { margin-bottom: 1.5rem; }
    .mb-8 { margin-bottom: 2rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mb-3 { margin-bottom: 0.75rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-1 { margin-bottom: 0.25rem; }
    .mt-12 { margin-top: 3rem; }
    .mt-6 { margin-top: 1.5rem; }
    .mt-4 { margin-top: 1rem; }
    .mt-5 { margin-top: 1.25rem; }
    .mt-3 { margin-top: 0.75rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-1 { margin-top: 0.25rem; }
    .mt-0\\.5 { margin-top: 0.125rem; }
    .pt-6 { padding-top: 1.5rem; }
    .pb-1 { padding-bottom: 0.25rem; }
    .space-y-8 > :not([hidden]) ~ :not([hidden]) { margin-top: 2rem; } 
    .space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 1.5rem; }
    .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
    .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.75rem; }
    .flex { display: flex; }
    .flex-col { flex-direction: column; }
    .md\\:flex-row { flex-direction: row; } 
    .flex-1 { flex: 1 1 0%; }
    .flex-wrap { flex-wrap: wrap; }
    .items-center { align-items: center; }
    .justify-center { justify-content: center; }
    .justify-between { justify-content: space-between; }
    .gap-6 { gap: 1.5rem; }
    .gap-4 { gap: 1rem; }
    .gap-2 { gap: 0.5rem; }
    .gap-1 { gap: 0.25rem; }
    .grid { display: grid; }
    .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } 
    .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
    .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
    .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
    .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
    .text-xs { font-size: 0.75rem; line-height: 1rem; }
    .font-bold { font-weight: 700; }
    .font-semibold { font-weight: 600; }
    .font-medium { font-weight: 500; }
    .text-center { text-align: center; }
    /* Colored text classes */
    .text-blue-600 { color: #2563eb; }
    .text-teal-600 { color: #0d9488; }
    .text-teal-700 { color: #0f766e; }
    .text-indigo-600 { color: #4f46e5; }
    .text-indigo-700 { color: #4338ca; }
    .text-green-600 { color: #16a34a; }
    .text-green-700 { color: #15803d; }
    .text-red-500 { color: #ef4444; }
    .hover\\:text-red-700:hover { color: #b91c1c; }
    /* Grayscale text classes (override body color if needed) */
    .text-gray-800 { color: #1f2937; }
    .text-gray-700 { color: #374151; }
    .text-gray-600 { color: #4b5563; }
    .text-gray-500 { color: #6b7280; }
    .text-white { color: #ffffff; } /* For dark backgrounds */

    .leading-none { line-height: 1; }
    .bg-gray-100 { background-color: #f3f4f6; }
    .bg-gray-200 { background-color: #e5e7eb; }
    .hover\\:bg-gray-300:hover { background-color: #d1d5db; }
    .bg-white { background-color: #ffffff; }
    .bg-blue-500 { background-color: #3b82f6; }
    .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
    .bg-blue-600 { background-color: #2563eb; }
    .bg-teal-100 { background-color: #ccfbf1; }
    .hover\\:bg-teal-200:hover { background-color: #99f6e4; }
    .bg-indigo-100 { background-color: #e0e7ff; }
    .hover\\:bg-indigo-200:hover { background-color: #c7d2fe; }
    .bg-indigo-50 { background-color: #eef2ff; }
    .bg-green-100 { background-color: #dcfce7; }
    .hover\\:bg-green-200:hover { background-color: #bbf7d0; }
    .bg-green-50 { background-color: #f0fdf4; }
    .bg-green-600 { background-color: #16a34a; }
    .hover\\:bg-green-700:hover { background-color: #15803d; }
    .bg-blue-50 { background-color: #eff6ff; }
    .border { border-width: 1px; border-style: solid; } 
    .border-gray-200 { border-color: #e5e7eb; }
    .border-gray-300 { border-color: #d1d5db; }
    .border-indigo-200 { border-color: #c7d2fe; }
    .border-indigo-300 { border-color: #a5b4fc; }
    .border-green-200 { border-color: #bbf7d0; }
    .border-green-300 { border-color: #86efac; }
    .rounded-lg { border-radius: 0.5rem; }
    .rounded-xl { border-radius: 0.75rem; }
    .rounded-md { border-radius: 0.375rem; }
    .rounded { border-radius: 0.25rem; }
    .w-full { width: 100%; }
    input[type="text"], input[type="number"], select { box-sizing: border-box; }
    .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
    .py-1\\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; } 
    .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
    .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
    .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
    .focus\\:ring-2:focus { box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); outline: none; }
    .focus\\:ring-blue-500:focus { box-shadow: 0 0 0 2px #3b82f6; outline: none; }
    .focus\\:border-blue-500:focus { border-color: #3b82f6; outline: none; }
    .focus\\:ring-indigo-500:focus { box-shadow: 0 0 0 2px #6366f1; outline: none; }
    .focus\\:border-indigo-500:focus { border-color: #6366f1; outline: none; }
    .focus\\:ring-green-500:focus { box-shadow: 0 0 0 2px #22c55e; outline: none; }
    .focus\\:border-green-500:focus { border-color: #22c55e; outline: none; }
    .block { display: block; }
    .inline-flex { display: inline-flex; }
    .hidden { display: none; }
    .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); }
    .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); }
    .shadow { box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06); }
    .fixed { position: fixed; }
    .top-4 { top: 1rem; }
    .left-4 { left: 1rem; }
    .right-4 { right: 1rem; } /* ADDED for RTL */
    .top-1 { top: 0.25rem; }
    .left-1 { left: 0.25rem; }
    .right-1 { right: 0.25rem; } /* ADDED for RTL */
    .z-50 { z-index: 50; }
    .cursor-pointer { cursor: pointer; }
    .max-w-5xl { max-width: 64rem; }
    .max-w-full { max-width: 100%; }
    .relative { position: relative; }
    .absolute { position: absolute; }
    .border-b { border-bottom-width: 1px; }
    .mr-2 { margin-right: 0.5rem; }
    .ml-2 { margin-left: 0.5rem; } /* Added for completeness if needed, original didn't have it, use gap instead */
    .mr-1 { margin-right: 0.25rem; }
    .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
    .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
    .text-orange-500 { color: #f97316; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }


     @media print {
            body { font-size: 7pt !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; margin:0; padding:0; }
            .container.mx-auto.px-4.py-8 { margin: 0 !important; padding: 0 !important; max-width: 100% !important; }
            #scheduleForm, .fixed.top-4.left-4, .bg-white.rounded-xl.shadow-lg.p-6.md:p-8.max-w-5xl.mx-auto, button#fillSampleData, button#generateSchedule { display: none !important; }
 #scheduleOutputContainer {
    position: static !important; /* أو relative لو تفضل */
    top: 0 !important;
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  body * {
    visibility: hidden;
  }

  #scheduleOutputContainer, #scheduleOutputContainer * {
    visibility: visible;
  }

  #scheduleOutputContainer {
    position: absolute !important;
    top: 0 !important;
    left: 0;
    width: 100%;
  }            .table-container { box-shadow: none !important; margin-bottom: 5px !important; overflow: visible !important; width: 100% !important; page-break-inside: avoid; }
            table { width: 100% !important; table-layout: fixed; border-collapse: collapse !important; margin-bottom: 5px !important; page-break-inside: avoid; }
            table th, table td {
                border: 0.5px solid #999 !important; 
                padding: 0px 1px !important; 
                font-size: 3pt !important; 
                min-height: auto !important;
                height: 1%; 
                overflow-wrap: break-word; 
                word-break: break-all;
                vertical-align: middle;
            }

            .gettable{
                display: none;
            }


            table th { background-color: #eaeaea !important; color: #000 !important; font-weight:bold; }
            .sticky-col-main-group, .sticky-col-section, th.sticky-header, th.sticky-time-header {
                position: static !important; 
            }
            .sticky-col-main-group { background-color: #e0e7ff !important; }
            .sticky-col-section { background-color: #f3f4f6 !important; }


            .vertical-text, .vertical-main-group-name {
                writing-mode: horizontal-tb !important; transform: none !important;
                white-space: normal !important; 
                font-size: 6pt !important; 
                padding: 0px !important;
                line-height: 1.1;
                display: block;
                text-align:center !important;

            }
             .vertical-text .location-text {
                display: block;
                font-size: 0.9em !important;
                opacity: 1 !important;
                margin-top: 0px;

            }

            .time-header , .sticky-col-section{
                font-size: 10px !important;
            }
            .vertical-main-group-name{
                font-size: 25px !important;
            }
            .sticky-header{
                font-size: 15px !important;
            }
            
/* 
             .lecture-cell{

            } */

            .lecture-cell .vertical-text{
                                writing-mode: vertical-rl !important;
    transform: rotate(180deg) !important;
                    font-size: 10pt !important; 

            }
`;
