import { useState, useEffect, useRef, useCallback } from "react";
import { GlobalStyles } from "./GlobalStyles.jsx";




const DAYS_SET_1 = ["الأحد", "الثلاثاء", "الخميس"];
const DAYS_SET_2 = ["السبت", "الاثنين", "الأربعاء"];
const FORM_AVAILABLE_DAYS = [
  "السبت",
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
];

// Helper Functions
const formatTime24 = (hour) => {
  if (typeof hour !== "number" || isNaN(hour) || hour < 0 || hour > 23)
    return null;
  return hour.toString().padStart(2, "0") + ":00";
};
const formatTime12Display = (hour24) => {
  if (typeof hour24 !== "number" || isNaN(hour24) || hour24 < 0 || hour24 > 23)
    return "N/A";
  const period = hour24 >= 12 ? "م" : "ص";
  let hour = hour24 % 12;
  if (hour === 0) hour = 12;
  return hour.toString() + ":00 " + period;
};
const formatTime12HeaderDisplay = (time12) => {
  if (!time12 || typeof time12 !== "string") return "-";
  const parts = time12.split(" ");
  if (parts.length < 2) return time12;
  const timePart = parts[0].split(":")[0];
  return timePart + parts[1];
};
const convertTo24HourFormat = (hour12, period) => {
  let h12 = parseInt(hour12);
  if (isNaN(h12) || h12 < 1 || h12 > 12) return null;
  let hour24 = h12;
  if (period === "PM" && h12 < 12) hour24 += 12;
  else if (period === "AM" && h12 === 12) hour24 = 0;
  return hour24;
};

function Generation() {
  const [universityInfo, setUniversityInfo] = useState({
    groupLevel: "الفرقة الأولى",
    universityName: "جامعة المدينة",
    specializationName: "هندسة البرمجيات",
    academicYear: "1445-1446",
    academicSemester: "الأول",
  });
  const [workHours, setWorkHours] = useState({
    workHourFrom12: "8",
    workPeriodFrom: "AM",
    workHourTo12: "4",
    workPeriodTo: "PM",
  });
  const [studentGroups, setStudentGroups] = useState([]);
  const [scheduleOutput, setScheduleOutput] = useState({
    tables: [],
    universityInfoForTable: "",
    timeSlots12hrDisplay: [],
    timeSlots24hr: [],
    show: false,
  });
  const [savedSchedulesList, setSavedSchedulesList] = useState([]);
  const [selectedScheduleToLoad, setSelectedScheduleToLoad] = useState("");

  const scheduleOutputRef = useRef(null);
  const tableRefs = useRef([]);

  const uuid = () =>
    Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

  const fetchSavedSchedules = useCallback(() => {
    fetch("http://localhost:5000/get-schedules")
      .then((response) => {
        if (!response.ok) {
          throw new Error("فشل في تحميل الجداول");
        }
        return response.json();
      })
      .then((data) => {
        setSavedSchedulesList(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Error loading schedules:", error);
        alert("حدث خطأ أثناء تحميل الجداول. الرجاء المحاولة لاحقاً.");
        setSavedSchedulesList([]);
      });
  }, []);

  useEffect(() => {
    fetchSavedSchedules();
  }, [fetchSavedSchedules]);
  useEffect(() => {
    if (studentGroups.length === 0) addStudentGroup();
  }, [studentGroups.length]);

  const handleUniversityInfoChange = (e) =>
    setUniversityInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleWorkHoursChange = (e) =>
    setWorkHours((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const addStudentGroup = () =>
    setStudentGroups((prev) => [
      ...prev,
      {
        id: uuid(),
        groupName: "",
        sectionFrom: "",
        sectionTo: "",
        days: [],
        lectures: [],
        sections: [],
      },
    ]);
  const updateStudentGroup = (id, field, value) =>
    setStudentGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  const removeStudentGroup = (id) =>
    setStudentGroups((prev) => prev.filter((g) => g.id !== id));
  const handleStudentGroupDayChange = (id, day) => {
    setStudentGroups((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              days: g.days.includes(day)
                ? g.days.filter((d) => d !== day)
                : [...g.days, day],
            }
          : g
      )
    );
  };

  const addLectureToGroup = (groupId) =>
    setStudentGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              lectures: [
                ...g.lectures,
                {
                  id: uuid(),
                  materialName: "",
                  doctorName: "",
                  location: "",
                  startTimeHour: "",
                  startTimePeriod: "AM",
                  endTimeHour: "",
                  endTimePeriod: "AM",
                  days: [],
                },
              ],
            }
          : g
      )
    );
  const updateLectureInGroup = (gId, lId, field, value) =>
    setStudentGroups((prev) =>
      prev.map((g) =>
        g.id === gId
          ? {
              ...g,
              lectures: g.lectures.map((l) =>
                l.id === lId ? { ...l, [field]: value } : l
              ),
            }
          : g
      )
    );
  const removeLectureFromGroup = (gId, lId) =>
    setStudentGroups((prev) =>
      prev.map((g) =>
        g.id === gId
          ? { ...g, lectures: g.lectures.filter((l) => l.id !== lId) }
          : g
      )
    );
  const handleLectureDayChange = (gId, lId, day) =>
    setStudentGroups((prev) =>
      prev.map((g) =>
        g.id === gId
          ? {
              ...g,
              lectures: g.lectures.map((l) =>
                l.id === lId
                  ? {
                      ...l,
                      days: l.days.includes(day)
                        ? l.days.filter((d) => d !== day)
                        : [...l.days, day],
                    }
                  : l
              ),
            }
          : g
      )
    );

  const addSectionToGroup = (groupId) =>
    setStudentGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              sections: [
                ...g.sections,
                {
                  id: uuid(),
                  materialName: "",
                  location: "",
                  from: "",
                  to: "",
                  startTimeHour: "",
                  startTimePeriod: "PM",
                  endTimeHour: "",
                  endTimePeriod: "PM",
                  days: [],
                },
              ],
            }
          : g
      )
    );
  const updateSectionInGroup = (gId, sId, field, value) =>
    setStudentGroups((prev) =>
      prev.map((g) =>
        g.id === gId
          ? {
              ...g,
              sections: g.sections.map((s) =>
                s.id === sId ? { ...s, [field]: value } : s
              ),
            }
          : g
      )
    );
  const removeSectionFromGroup = (gId, sId) =>
    setStudentGroups((prev) =>
      prev.map((g) =>
        g.id === gId
          ? { ...g, sections: g.sections.filter((s) => s.id !== sId) }
          : g
      )
    );
  const handleSectionDayChange = (gId, sId, day) =>
    setStudentGroups((prev) =>
      prev.map((g) =>
        g.id === gId
          ? {
              ...g,
              sections: g.sections.map((s) =>
                s.id === sId
                  ? {
                      ...s,
                      days: s.days.includes(day)
                        ? s.days.filter((d) => d !== day)
                        : [...s.days, day],
                    }
                  : s
              ),
            }
          : g
      )
    );

  const generateTimeSlots = (startHour24, endHour24LoopBoundary) => {
    const slots24 = [],
      slots12 = [];
    let effStart = startHour24,
      effEnd = endHour24LoopBoundary;
    if (
      isNaN(effStart) ||
      isNaN(effEnd) ||
      effStart < 0 ||
      effEnd > 24 ||
      effStart >= effEnd
    ) {
      effStart = 8;
      effEnd = 17;
    }
    for (let hour = effStart; hour < effEnd; hour++) {
      const formatted24 = formatTime24(hour),
        formatted12 = formatTime12Display(hour);
      if (formatted24 && formatted12) {
        slots24.push(formatted24);
        slots12.push(formatted12);
      }
    }
    return { slots24, slots12 };
  };

  const handleGenerateSchedule = () => {
    let startHour24 = convertTo24HourFormat(
      workHours.workHourFrom12,
      workHours.workPeriodFrom
    );
    let endHour24TargetSlot = convertTo24HourFormat(
      workHours.workHourTo12,
      workHours.workPeriodTo
    );
    if (startHour24 === null || endHour24TargetSlot === null) {
      console.warn("Invalid work hours");
      startHour24 = 8;
      endHour24TargetSlot = 16;
    }
    let endHour24ForLoopBoundary = endHour24TargetSlot + 1;
    if (endHour24ForLoopBoundary > 24) endHour24ForLoopBoundary = 24;
    if (startHour24 >= endHour24ForLoopBoundary) {
      console.warn("End time before start");
      startHour24 = 8;
      endHour24ForLoopBoundary = 17;
    }

    const generatedTimes = generateTimeSlots(
      startHour24,
      endHour24ForLoopBoundary
    );
    const currentTimeslots24hr = generatedTimes.slots24,
      currentTimeslots12hrDisplay = generatedTimes.slots12;
    if (currentTimeslots24hr.length === 0) {
      alert("No valid time slots.");
      return;
    }

    const processedStudentGroupsData = studentGroups
      .map((group, idx) => {
        const sectionFrom = parseInt(group.sectionFrom),
          sectionTo = parseInt(group.sectionTo);
        if (
          isNaN(sectionFrom) ||
          isNaN(sectionTo) ||
          sectionFrom <= 0 ||
          sectionTo < sectionFrom
        ) {
          console.warn(
            `Invalid section range for group ${group.groupName || idx + 1}`
          );
          return null;
        }
        if (group.days.length === 0) {
          console.warn(`No days for group ${group.groupName || idx + 1}`);
          return null;
        }
        const groupIdentifier = group.groupName || `تقسيم ${idx + 1}`;
        return {
          id: group.id,
          name: groupIdentifier,
          sectionFrom,
          sectionTo,
          sectionsCount: sectionTo - sectionFrom + 1,
          groupDays: group.days,
          lectures: group.lectures
            .map((lec) => {
              const convStart = convertTo24HourFormat(
                  lec.startTimeHour,
                  lec.startTimePeriod
                ),
                convEnd = convertTo24HourFormat(
                  lec.endTimeHour,
                  lec.endTimePeriod
                );
              if (
                !lec.materialName ||
                convStart === null ||
                convEnd === null ||
                convStart >= convEnd ||
                lec.days.length === 0
              )
                return null;
              return {
                type: "lecture",
                name: lec.materialName,
                startTime24: formatTime24(convStart),
                endTime24: formatTime24(convEnd),
                doctor: lec.doctorName || "N/A",
                location: lec.location || "N/A",
                days: lec.days,
                groupIdentifier,
              };
            })
            .filter(Boolean),
          sections: group.sections
            .map((sec) => {
              const convStart = convertTo24HourFormat(
                  sec.startTimeHour,
                  sec.startTimePeriod
                ),
                convEnd = convertTo24HourFormat(
                  sec.endTimeHour,
                  sec.endTimePeriod
                );
              let fromAbs = sec.from ? parseInt(sec.from) : sectionFrom,
                toAbs = sec.to ? parseInt(sec.to) : sectionTo;
              if (isNaN(fromAbs) || fromAbs < sectionFrom)
                fromAbs = sectionFrom;
              if (isNaN(toAbs) || toAbs > sectionTo) toAbs = sectionTo;
              if (toAbs < fromAbs) toAbs = fromAbs;
              if (
                !sec.materialName ||
                convStart === null ||
                convEnd === null ||
                convStart >= convEnd ||
                sec.days.length === 0
              )
                return null;
              return {
                type: "section",
                materialName: sec.materialName,
                location: sec.location || "N/A",
                fromSectionAbsolute: fromAbs,
                toSectionAbsolute: toAbs,
                startTime24: formatTime24(convStart),
                endTime24: formatTime24(convEnd),
                days: sec.days,
                groupIdentifier,
              };
            })
            .filter(Boolean),
        };
      })
      .filter(Boolean);

    if (processedStudentGroupsData.length === 0) {
      /* alert("لا توجد تقسيمات طلاب صالحة."); */
      /* return; */
    }

    const newTables = [DAYS_SET_1, DAYS_SET_2]
      .map((currentDaySet, setIndex) => {
        const activeDaysInThisSet = currentDaySet.filter((day) =>
          processedStudentGroupsData.some(
            (g) => g.groupDays.includes(day) && g.sectionsCount > 0
          )
        );
        if (activeDaysInThisSet.length === 0) return null;

        const tableRowsData = [],
          sectionToRowIndexMap = new Map();
        let currentVisibleRowIdx = 0;
        processedStudentGroupsData.forEach((g) => {
          if (
            g.groupDays.some((gd) => activeDaysInThisSet.includes(gd)) &&
            g.sectionFrom <= g.sectionTo
          ) {
            for (let secNum = g.sectionFrom; secNum <= g.sectionTo; secNum++)
              sectionToRowIndexMap.set(
                secNum + "_" + g.id,
                currentVisibleRowIdx++
              );
          }
        });
        if (
          sectionToRowIndexMap.size === 0 &&
          currentTimeslots24hr.length === 0
        )
          return null;

        const rowOccupiedSlots = Array(currentVisibleRowIdx)
          .fill(null)
          .map(() => new Set());
        processedStudentGroupsData.forEach((group) => {
          if (
            !group.groupDays.some((gd) => activeDaysInThisSet.includes(gd)) ||
            group.sectionsCount === 0
          )
            return;
          const sectionsOfThisGroup = Array.from(
            { length: group.sectionTo - group.sectionFrom + 1 },
            (_, i) => group.sectionFrom + i
          );
          sectionsOfThisGroup.forEach((secNum, idx) => {
            const rowData = {
              id: `row_${group.id}_s${secNum}`,
              isFirstOfGroup: idx === 0,
              groupName: group.name,
              rowSpanGroupName: idx === 0 ? sectionsOfThisGroup.length : 1,
              sectionName: `S${secNum}`,
              timeCells: [],
            };
            activeDaysInThisSet.forEach((day) =>
              currentTimeslots24hr.forEach((ts) =>
                rowData.timeCells.push({
                  id: `cell_${day}_${ts.replace(":", "")}`,
                  content: null,
                  type: null,
                  colSpan: 1,
                  rowSpan: 1,
                  isHidden: false,
                  tooltip: "",
                })
              )
            );
            tableRowsData.push(rowData);
          });
        });

        if (tableRowsData.length > 0) {
          processedStudentGroupsData.forEach((group) => {
            if (!group.groupDays.some((gd) => activeDaysInThisSet.includes(gd)))
              return;
            [...group.lectures, ...group.sections].forEach((item) => {
              const itemDaysInSet = item.days.filter(
                (d) =>
                  activeDaysInThisSet.includes(d) && group.groupDays.includes(d)
              );
              if (itemDaysInSet.length === 0) return;
              const startIndex = currentTimeslots24hr.indexOf(item.startTime24);
              let endIndex = currentTimeslots24hr.indexOf(item.endTime24);
              if (
                endIndex === -1 &&
                currentTimeslots24hr.length > 0 &&
                item.endTime24 &&
                currentTimeslots24hr[currentTimeslots24hr.length - 1] &&
                parseInt(item.endTime24.split(":")[0]) ===
                  parseInt(
                    currentTimeslots24hr[currentTimeslots24hr.length - 1].split(
                      ":"
                    )[0]
                  ) +
                    1
              ) {
                endIndex = currentTimeslots24hr.length;
              }
              if (
                startIndex === -1 ||
                endIndex === -1 ||
                endIndex <= startIndex
              )
                return;
              const duration = endIndex - startIndex;

              itemDaysInSet.forEach((day) => {
                const dayIdxInDisplay = activeDaysInThisSet.indexOf(day);
                if (dayIdxInDisplay === -1) return;

                let firstRowIdxForItem = -1,
                  numRowsToSpan = 0,
                  actualSectionsInItem = [];
                if (item.type === "lecture") {
                  for (let s = group.sectionFrom; s <= group.sectionTo; s++) {
                    const mapKey = s + "_" + group.id;
                    if (sectionToRowIndexMap.has(mapKey)) {
                      if (firstRowIdxForItem === -1)
                        firstRowIdxForItem = sectionToRowIndexMap.get(mapKey);
                      numRowsToSpan++;
                    }
                  }
                } else {
                  for (
                    let s = item.fromSectionAbsolute;
                    s <= item.toSectionAbsolute;
                    s++
                  ) {
                    const mapKey = s + "_" + group.id;
                    if (
                      s >= group.sectionFrom &&
                      s <= group.sectionTo &&
                      sectionToRowIndexMap.has(mapKey)
                    ) {
                      if (firstRowIdxForItem === -1)
                        firstRowIdxForItem = sectionToRowIndexMap.get(mapKey);
                      numRowsToSpan++;
                      actualSectionsInItem.push(s);
                    }
                  }
                }
                if (firstRowIdxForItem === -1 || numRowsToSpan === 0) return;
                if (firstRowIdxForItem + numRowsToSpan > tableRowsData.length) {
                  numRowsToSpan = tableRowsData.length - firstRowIdxForItem;
                  if (numRowsToSpan <= 0) return;
                }

                let canPlace = true;
                for (let rOff = 0; rOff < numRowsToSpan; rOff++) {
                  const checkRowIdx = firstRowIdxForItem + rOff;
                  for (let i = 0; i < duration; i++)
                    if (
                      rowOccupiedSlots[checkRowIdx].has(
                        `${dayIdxInDisplay}-${startIndex + i}`
                      )
                    ) {
                      canPlace = false;
                      break;
                    }
                  if (!canPlace) break;
                }

                if (canPlace && firstRowIdxForItem < tableRowsData.length) {
                  const targetCellGlobalIdx =
                    dayIdxInDisplay * currentTimeslots24hr.length + startIndex;
                  const targetRow = tableRowsData[firstRowIdxForItem];
                  if (targetRow && targetRow.timeCells[targetCellGlobalIdx]) {
                    let tooltipText = `المادة: ${
                      item.name || item.materialName
                    }\nالوقت: ${formatTime12Display(
                      parseInt(item.startTime24.split(":")[0])
                    )} - ${formatTime12Display(
                      parseInt(item.endTime24.split(":")[0])
                    )}\nالمكان: ${item.location}\nالتقسيم: ${
                      item.groupIdentifier
                    }`;
                    if (item.type === "lecture")
                      tooltipText += `\nالمحاضر: ${item.doctor}`;
                    else
                      tooltipText += `\nالسكاشن: ${
                        actualSectionsInItem.length > 1
                          ? `S${Math.min(...actualSectionsInItem)}-S${Math.max(
                              ...actualSectionsInItem
                            )}`
                          : `S${actualSectionsInItem[0]}`
                      }`;

                    Object.assign(targetRow.timeCells[targetCellGlobalIdx], {
                      content: item.name || item.materialName,
                      location: item.location,
                      type: item.type,
                      colSpan: duration,
                      rowSpan: numRowsToSpan,
                      tooltip: tooltipText,
                    });
                    for (let rOff = 0; rOff < numRowsToSpan; rOff++) {
                      const rowIdxToMark = firstRowIdxForItem + rOff;
                      for (let c = 0; c < duration; c++) {
                        rowOccupiedSlots[rowIdxToMark].add(
                          `${dayIdxInDisplay}-${startIndex + c}`
                        );
                        if (rOff === 0 && c === 0) continue;
                        const cellIdxToHide =
                          dayIdxInDisplay * currentTimeslots24hr.length +
                          startIndex +
                          c;
                        if (
                          tableRowsData[rowIdxToMark] &&
                          tableRowsData[rowIdxToMark].timeCells[cellIdxToHide]
                        )
                          tableRowsData[rowIdxToMark].timeCells[
                            cellIdxToHide
                          ].isHidden = true;
                      }
                    }
                  }
                }
              });
            });
          });
          return {
            id: `table_set_${setIndex}`,
            daysHeader: activeDaysInThisSet,
            timeHeader: currentTimeslots12hrDisplay,
            rows: tableRowsData,
          };
        }
        return null;
      })
      .filter(Boolean);

    setScheduleOutput({
      tables: newTables,
      universityInfoForTable: `${universityInfo.universityName} - ${universityInfo.specializationName} - ${universityInfo.groupLevel}<br> ${universityInfo.academicYear} - ${universityInfo.academicSemester}`,
      timeSlots12hrDisplay: currentTimeslots12hrDisplay,
      timeSlots24hr: currentTimeslots24hr,
      show: true,
    });
    setTimeout(() => {
      scheduleOutputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      tableRefs.current.forEach((tableEl) => {
        if (tableEl) {
          const mainGroupCol = tableEl.querySelector(".sticky-col-main-group");
          const sectionCols = tableEl.querySelectorAll(".sticky-col-section");
          const dayHeaderRow = tableEl.querySelector("thead tr:first-child");
          const timeHeaderThs = tableEl.querySelectorAll(
            "th.sticky-time-header"
          );

          if (mainGroupCol) {
            const groupColWidth = mainGroupCol.offsetWidth || 35;
            sectionCols.forEach(
              (sc) => (sc.style.right = `${groupColWidth}px`)
            ); // Position for RTL
          }
          if (dayHeaderRow) {
            const headerHeight = dayHeaderRow.offsetHeight || 30;
            timeHeaderThs.forEach((th) => (th.style.top = `${headerHeight}px`));
          }
        }
      });
    }, 100);
  };

  const fillSampleData = () => {
    setUniversityInfo({
      universityName: "جامعة طيبة",
      specializationName: "علوم الحاسب",
      groupLevel: "الفرقة الثالثة",
      academicYear: "1446-1447",
      academicSemester: "الفصل الأول",
    });
    setWorkHours({
      workHourFrom12: "8",
      workPeriodFrom: "AM",
      workHourTo12: "4",
      workPeriodTo: "PM",
    });
    setStudentGroups([
      {
        id: uuid(),
        groupName: "أ",
        sectionFrom: "1",
        sectionTo: "5",
        days: ["الأحد", "الثلاثاء", "الخميس"],
        lectures: [
          {
            id: uuid(),
            materialName: "برمجة 1",
            doctorName: "د. أحمد",
            location: "قاعة 101",
            startTimeHour: "8",
            startTimePeriod: "AM",
            endTimeHour: "10",
            endTimePeriod: "AM",
            days: ["الأحد", "الثلاثاء"],
          },
        ],
        sections: [
          {
            id: uuid(),
            materialName: "عملي برمجة 1",
            location: "معمل ألف",
            from: "1",
            to: "2",
            startTimeHour: "10",
            startTimePeriod: "AM",
            endTimeHour: "12",
            endTimePeriod: "AM",
            days: ["الخميس"],
          },
          {
            id: uuid(),
            materialName: "دعم فني",
            location: "مكتب 5",
            from: "4",
            to: "4",
            startTimeHour: "1",
            startTimePeriod: "PM",
            endTimeHour: "2",
            endTimePeriod: "PM",
            days: ["الثلاثاء"],
          },
        ],
      },
      {
        id: uuid(),
        groupName: "ب",
        sectionFrom: "6",
        sectionTo: "10",
        days: ["السبت", "الاثنين", "الأربعاء"],
        lectures: [
          {
            id: uuid(),
            materialName: "شبكات",
            doctorName: "د. سامي",
            location: "مدرج ب",
            startTimeHour: "1",
            startTimePeriod: "PM",
            endTimeHour: "3",
            endTimePeriod: "PM",
            days: ["الاثنين", "الأربعاء"],
          },
        ],
        sections: [
          {
            id: uuid(),
            materialName: "عملي شبكات",
            location: "معمل جيم",
            from: "6",
            to: "8",
            startTimeHour: "2",
            startTimePeriod: "PM",
            endTimeHour: "4",
            endTimePeriod: "PM",
            days: ["السبت"],
          },
        ],
      },
    ]);
  };

  const collectAllFormDataForSave = () => ({
    groupLevel: universityInfo.groupLevel,
    university: universityInfo.universityName,
    specialization: universityInfo.specializationName,
    academicYear: universityInfo.academicYear,
    academicSemester: universityInfo.academicSemester,
    workHourFrom:
      `${workHours.workHourFrom12} ${workHours.workPeriodFrom}`.trim(),
    workHourTo: `${workHours.workHourTo12} ${workHours.workPeriodTo}`.trim(),
    groups: studentGroups.map((g) => ({
      groupName: g.groupName,
      sectionFrom: parseInt(g.sectionFrom) || 0,
      sectionTo: parseInt(g.sectionTo) || 0,
      days: g.days,
      lectures: g.lectures.map((l) => ({
        materialName: l.materialName,
        doctorName: l.doctorName,
        location: l.location,
        days: l.days,
        startTime: `${l.startTimeHour} ${l.startTimePeriod}`.trim(),
        endTime: `${l.endTimeHour} ${l.endTimePeriod}`.trim(),
      })),
      sections: g.sections.map((s) => ({
        materialName: s.materialName,
        location: s.location,
        from: parseInt(s.from) || 0,
        to: parseInt(s.to) || 0,
        days: s.days,
        startTime: `${s.startTimeHour} ${s.startTimePeriod}`.trim(),
        endTime: `${s.endTimeHour} ${s.endTimePeriod}`.trim(),
      })),
    })),
  });

  const handleSaveSchedule = () => {
    const payload = collectAllFormDataForSave();
    if (
      !payload.groups ||
      payload.groups.length === 0 ||
      !payload.groups.some(
        (g) =>
          (g.lectures && g.lectures.length > 0) ||
          (g.sections && g.sections.length > 0)
      )
    ) {
      alert("يرجى إضافة تقسيمات ومحاضرات/سكاشن صالحة!");
      return;
    }

    fetch("http://localhost:5000/save-schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        if (data.message.includes("بنجاح")) {
          fetchSavedSchedules();

          // اضغط الزر بعد الحفظ الناجح
          setTimeout(() => {
            const generateBtn = document.getElementById("generateScheduleBtn");
            if (generateBtn) generateBtn.click();
          }, 100); // بعد ثانية مثلاً
        }
      })
      .catch((err) => {
        console.error("Error saving:", err);
        alert("خطأ في الحفظ.");
      });
  };

  const fillFormWithLoadedData = (data) => {
    setUniversityInfo({
      groupLevel: data.groupLevel || "",
      universityName: data.university || "",
      specializationName: data.specialization || "",
      academicYear: data.academicYear || "",
      academicSemester: data.academicSemester || "",
    });
    const [hF, pF] = data.workHourFrom
      ? data.workHourFrom.split(" ")
      : ["", "AM"];
    const [hT, pT] = data.workHourTo ? data.workHourTo.split(" ") : ["", "PM"];
    setWorkHours({
      workHourFrom12: hF,
      workPeriodFrom: pF,
      workHourTo12: hT,
      workPeriodTo: pT,
    });
    const loadedGroups = data.groups
      ? data.groups.map((gD) => ({
          id: uuid(),
          groupName: gD.groupName || "",
          sectionFrom: gD.sectionFrom?.toString() || "",
          sectionTo: gD.sectionTo?.toString() || "",
          days: gD.days || [],
          lectures: gD.lectures
            ? gD.lectures.map((lD) => {
                const [sH, sP] = lD.startTime
                  ? lD.startTime.split(" ")
                  : ["", "AM"];
                const [eH, eP] = lD.endTime
                  ? lD.endTime.split(" ")
                  : ["", "AM"];
                return {
                  id: uuid(),
                  materialName: lD.materialName || "",
                  doctorName: lD.doctorName || "",
                  location: lD.location || "",
                  startTimeHour: sH,
                  startTimePeriod: sP,
                  endTimeHour: eH,
                  endTimePeriod: eP,
                  days: lD.days || [],
                };
              })
            : [],
          sections: gD.sections
            ? gD.sections.map((sD) => {
                const [sH, sP] = sD.startTime
                  ? sD.startTime.split(" ")
                  : ["", "PM"];
                const [eH, eP] = sD.endTime
                  ? sD.endTime.split(" ")
                  : ["", "PM"];
                return {
                  id: uuid(),
                  materialName: sD.materialName || "",
                  location: sD.location || "",
                  from: sD.from?.toString() || "",
                  to: sD.to?.toString() || "",
                  startTimeHour: sH,
                  startTimePeriod: sP,
                  endTimeHour: eH,
                  endTimePeriod: eP,
                  days: sD.days || [],
                };
              })
            : [],
        }))
      : [];
    setStudentGroups(
      loadedGroups.length > 0
        ? loadedGroups
        : [
            {
              id: uuid(),
              groupName: "",
              sectionFrom: "",
              sectionTo: "",
              days: [],
              lectures: [],
              sections: [],
            },
          ]
    );
  };
  const handleLoadSelectedSchedule = () => {
    if (!selectedScheduleToLoad) return;
    fetch(`http://localhost:5000/get-schedule/${selectedScheduleToLoad}`)
      .then((res) => res.json())
      .then((data) => {
        fillFormWithLoadedData(data);
        alert("تم تحميل بيانات الجدول بنجاح! سيتم الآن إنشاء الجدول.");
        console.log("oj");

        // اضغط الزر بعد ثانية
        setTimeout(() => {
          const generateBtn = document.getElementById("generateScheduleBtn");
          if (generateBtn) generateBtn.click();
        }, 500); // 1000 ملي ثانية = 1 ثانية
      })
      .catch((err) => {
        console.error("Error loading schedule:", err);
        alert("خطأ في تحميل الجدول.");
      });
  };

  const handleDeleteSelectedSchedule = () => {
    if (!selectedScheduleToLoad) {
      alert("اختر جدولاً للحذف!");
      return;
    }
    if (window.confirm("هل أنت متأكد من حذف هذا الجدول؟")) {
      fetch(`http://localhost:5000/delete-schedule/${selectedScheduleToLoad}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.reload();
          if (data.message === "تم الحذف بنجاح") {
            alert("تم الحذف!");
            fetchSavedSchedules();
            setSelectedScheduleToLoad("");
          } else {
            // alert('خطأ في الحذف.');
          }
        })
        .catch((err) => {
          console.error("Error deleting:", err);
          alert("خطأ في حذف الجدول.");
        });
    }
  };

  const printSchedule = () => {
    if (
      !scheduleOutputRef.current ||
      scheduleOutputRef.current.offsetHeight === 0
    ) {
      alert("أنشئ جدولاً أو قم بتحميله أولاً للطباعة.");
    } else {
      window.print();
    }
  };

  return (
    <>
      <style>{GlobalStyles}</style>
      <div className="generate-schedule-form relative" dir="rtl">
        {/* Changed left-4 to right-4 for RTL */}
        <div className="  absolute top-4 right-4  print-hide">
          <button
            onClick={printSchedule}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg"
          >
            طباعة الجدول
          </button>
        </div>
        <div className=" container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
              نظام جدول المحاضرات (جداول منفصلة)
            </h1>
            <div className="mb-6 p-4 bg-gray-100 rounded-lg gettable">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                استرجاع الجداول المحفوظة
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <select
                  value={selectedScheduleToLoad}
                  onChange={(e) => setSelectedScheduleToLoad(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>
                    اختر جدولاً محفوظاً
                  </option>
                  {savedSchedulesList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.university} - {s.specialization} (
                      {s.group_level || "غير محدد"})
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleLoadSelectedSchedule}
                  disabled={!selectedScheduleToLoad}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  تحميل وعرض الجدول
                </button>
                <button
                  onClick={handleDeleteSelectedSchedule}
                  disabled={!selectedScheduleToLoad}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  حذف الجدول
                </button>
              </div>
            </div>
            <form id="scheduleForm" className="space-y-8">
              <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
                <h2 className="form-section-title text-blue-600">
                  معلومات المؤسسة التعليمية
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {Object.entries({
                    groupLevel: "الفرقة",
                    universityName: "اسم الجامعة",
                    specializationName: "التخصص",
                    academicYear: "السنة الأكاديمية",
                    academicSemester: "الفصل الدراسي",
                  }).map(([k, l]) => (
                    <div key={k}>
                      <label htmlFor={k} className="block text-gray-700 mb-2">
                        {l}
                      </label>
                      <input
                        type="text"
                        id={k}
                        name={k}
                        value={universityInfo[k]}
                        onChange={handleUniversityInfoChange}
                        placeholder={l}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <label className="block text-gray-700 mb-2">
                    ساعات العمل (بنظام 12 ساعة):
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: "From", label: "من الساعة" },
                      { id: "To", label: "إلى الساعة" },
                    ].map((item) => (
                      <div key={item.id}>
                        <label
                          htmlFor={`workHour${item.id}12`}
                          className="block text-xs text-gray-500 mb-1"
                        >
                          {item.label}
                        </label>
                        <div className="time-input-form-group flex gap-2">
                          <input
                            type="number"
                            id={`workHour${item.id}12`}
                            name={`workHour${item.id}12`}
                            value={workHours[`workHour${item.id}12`]}
                            onChange={handleWorkHoursChange}
                            placeholder={item.id === "From" ? "8" : "4"}
                            min="1"
                            max="12"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                          <select
                            id={`workPeriod${item.id}`}
                            name={`workPeriod${item.id}`}
                            value={workHours[`workPeriod${item.id}`]}
                            onChange={handleWorkHoursChange}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="AM">ص</option>
                            <option value="PM">م</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    <strong>توضيح:</strong> "إلى الساعة" تحدد نهاية فترة العمل.
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 p-4 rounded-lg shadow-sm">
                <h2 className="form-section-title text-teal-600">
                  تقسيمات السكاشن
                </h2>
                <div id="studentGroupsContainer" className="space-y-6 mt-4">
                  {studentGroups.map((group, groupIdx) => (
                    <div
                      key={group.id}
                      className="group-item border border-gray-300 p-4 rounded-lg shadow"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">
                          تقسيم {groupIdx + 1}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeStudentGroup(group.id)}
                          className="text-red-500 hover:text-red-700 text-2xl"
                        >
                          ×
                        </button>
                      </div>
                      <input
                        type="text"
                        value={group.groupName}
                        onChange={(e) =>
                          updateStudentGroup(
                            group.id,
                            "groupName",
                            e.target.value
                          )
                        }
                        placeholder="اسم التقسيم (مثال: أ, ب)"
                        className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        {[
                          { id: "sectionFrom", label: "من سكشن رقم" },
                          { id: "sectionTo", label: "إلى سكشن رقم" },
                        ].map((item) => (
                          <div key={item.id}>
                            <label className="block text-gray-700 mb-1 text-sm">
                              {item.label}
                            </label>
                            <input
                              type="number"
                              value={group[item.id]}
                              onChange={(e) =>
                                updateStudentGroup(
                                  group.id,
                                  item.id,
                                  e.target.value
                                )
                              }
                              min="1"
                              placeholder={
                                item.id === "sectionFrom" ? "1" : "5"
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mt-3">
                        <label className="block text-gray-700 mb-1 text-sm">
                          أيام الدوام للتقسيم
                        </label>
                        <div className="day-selector flex flex-wrap gap-1">
                          {FORM_AVAILABLE_DAYS.map((day) => (
                            <label
                              key={day}
                              className="inline-flex items-center"
                            >
                              <input
                                type="checkbox"
                                checked={group.days.includes(day)}
                                onChange={() =>
                                  handleStudentGroupDayChange(group.id, day)
                                }
                                className="hidden"
                              />
                              <span>{day}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      {[
                        {
                          type: "lectures",
                          title: "المحاضرات",
                          addFn: addLectureToGroup,
                          removeFn: removeLectureFromGroup,
                          updateFn: updateLectureInGroup,
                          dayChangeFn: handleLectureDayChange,
                          color: "indigo",
                        },
                        {
                          type: "sections",
                          title: "السكاشن",
                          addFn: addSectionToGroup,
                          removeFn: removeSectionFromGroup,
                          updateFn: updateSectionInGroup,
                          dayChangeFn: handleSectionDayChange,
                          color: "green",
                        },
                      ].map((itemType) => (
                        <div key={itemType.type} className={`mt-5`}>
                          <h4
                            className={`text-lg font-semibold text-${itemType.color}-600 mb-2`}
                          >
                            {itemType.title}
                          </h4>
                          <div className="space-y-4">
                            {group[itemType.type].map((item, itemIdx) => (
                              <div
                                key={item.id}
                                className={`p-3 border border-${itemType.color}-200 rounded-lg relative bg-${itemType.color}-50 shadow-sm`}
                              >
                                {/* Changed left-1 to right-1 for RTL */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    itemType.removeFn(group.id, item.id)
                                  }
                                  className={`absolute top-1 left-1 text-red-500 hover:text-red-700 text-lg p-1 leading-none`}
                                >
                                  ×
                                </button>
                                <h5
                                  className={`text-sm font-semibold text-${itemType.color}-700 border-b border-${itemType.color}-300 pb-1 mb-2`}
                                >
                                  {itemType.type === "lectures"
                                    ? "المحاضرة"
                                    : "السكشن"}{" "}
                                  {itemIdx + 1}
                                </h5>
                                <input
                                  type="text"
                                  value={item.materialName}
                                  onChange={(e) =>
                                    itemType.updateFn(
                                      group.id,
                                      item.id,
                                      "materialName",
                                      e.target.value
                                    )
                                  }
                                  placeholder="اسم المادة"
                                  className={`w-full mb-2 px-2 py-1.5 border border-gray-300 rounded-md text-xs focus:ring-${itemType.color}-500 focus:border-${itemType.color}-500`}
                                />
                                {itemType.type === "lectures" && (
                                  <input
                                    type="text"
                                    value={item.doctorName}
                                    onChange={(e) =>
                                      itemType.updateFn(
                                        group.id,
                                        item.id,
                                        "doctorName",
                                        e.target.value
                                      )
                                    }
                                    placeholder="اسم الدكتور"
                                    className={`w-full mb-2 px-2 py-1.5 border border-gray-300 rounded-md text-xs focus:ring-${itemType.color}-500 focus:border-${itemType.color}-500`}
                                  />
                                )}
                                <input
                                  type="text"
                                  value={item.location}
                                  onChange={(e) =>
                                    itemType.updateFn(
                                      group.id,
                                      item.id,
                                      "location",
                                      e.target.value
                                    )
                                  }
                                  placeholder="المكان"
                                  className={`w-full mb-2 px-2 py-1.5 border border-gray-300 rounded-md text-xs focus:ring-${itemType.color}-500 focus:border-${itemType.color}-500`}
                                />
                                {itemType.type === "sections" && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                    <div>
                                      <label className="text-xs text-gray-600">
                                        من S
                                      </label>
                                      <input
                                        type="number"
                                        value={item.from}
                                        onChange={(e) =>
                                          itemType.updateFn(
                                            group.id,
                                            item.id,
                                            "from",
                                            e.target.value
                                          )
                                        }
                                        min="1"
                                        placeholder="مثال: 1"
                                        className={`w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-${itemType.color}-500`}
                                      />
                                    </div>
                                    <div>
                                      <label className="text-xs text-gray-600">
                                        إلى S
                                      </label>
                                      <input
                                        type="number"
                                        value={item.to}
                                        onChange={(e) =>
                                          itemType.updateFn(
                                            group.id,
                                            item.id,
                                            "to",
                                            e.target.value
                                          )
                                        }
                                        min="1"
                                        placeholder="مثال: 3"
                                        className={`w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-${itemType.color}-500`}
                                      />
                                    </div>
                                  </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  <div className="time-input flex items-center gap-1">
                                    <label className="text-xs text-gray-600">
                                      وقت البدء:
                                    </label>
                                    <input
                                      type="number"
                                      value={item.startTimeHour}
                                      onChange={(e) =>
                                        itemType.updateFn(
                                          group.id,
                                          item.id,
                                          "startTimeHour",
                                          e.target.value
                                        )
                                      }
                                      placeholder="9"
                                      min="1"
                                      max="12"
                                      className="border border-gray-300 rounded text-xs"
                                    />
                                    <select
                                      value={item.startTimePeriod}
                                      onChange={(e) =>
                                        itemType.updateFn(
                                          group.id,
                                          item.id,
                                          "startTimePeriod",
                                          e.target.value
                                        )
                                      }
                                      className="border border-gray-300 rounded text-xs"
                                    >
                                      <option value="AM">ص</option>
                                      <option value="PM">م</option>
                                    </select>
                                    <label className="text-xs text-gray-600 mx-1">
                                      إلى
                                    </label>
                                    <label className="text-xs text-gray-600">
                                      وقت الإنتهاء:
                                    </label>
                                    <input
                                      type="number"
                                      value={item.endTimeHour}
                                      onChange={(e) =>
                                        itemType.updateFn(
                                          group.id,
                                          item.id,
                                          "endTimeHour",
                                          e.target.value
                                        )
                                      }
                                      placeholder="11"
                                      min="1"
                                      max="12"
                                      className="border border-gray-300 rounded text-xs"
                                    />
                                    <select
                                      value={item.endTimePeriod}
                                      onChange={(e) =>
                                        itemType.updateFn(
                                          group.id,
                                          item.id,
                                          "endTimePeriod",
                                          e.target.value
                                        )
                                      }
                                      className="border border-gray-300 rounded text-xs"
                                    >
                                      <option value="AM">ص</option>
                                      <option value="PM">م</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="text-xs text-gray-600 mb-0.5 block">
                                      الأيام
                                    </label>
                                    <div className="day-selector flex flex-wrap gap-1">
                                      {FORM_AVAILABLE_DAYS.map((day) => (
                                        <label
                                          key={day}
                                          className="inline-flex items-center"
                                        >
                                          <input
                                            type="checkbox"
                                            checked={item.days.includes(day)}
                                            onChange={() =>
                                              itemType.dayChangeFn(
                                                group.id,
                                                item.id,
                                                day
                                              )
                                            }
                                            className="hidden"
                                          />
                                          <span>{day.substring(0, 3)}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => itemType.addFn(group.id)}
                            className={`mt-2 bg-${itemType.color}-100 text-${itemType.color}-700 px-3 py-1.5 rounded-md text-sm hover:bg-${itemType.color}-200 w-full`}
                          >
                            إضافة{" "}
                            {itemType.type === "lectures"
                              ? "محاضرة جديدة"
                              : "سكشن جديد"}
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addStudentGroup}
                  className="mt-4 bg-teal-100 text-teal-700 px-4 py-2 rounded-lg hover:bg-teal-200 w-full"
                >
                  إضافة تقسيم سكاشن جديد
                </button>
              </div>
              <div className="flex flex-col md:flex-row gap-4 pt-6">
                <button
                  type="button"
                  onClick={fillSampleData}
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 flex-1"
                >
                  تعبئة بيانات تجريبية
                </button>
                <button
                  id="generateScheduleBtn"
                  type="button"
                  onClick={handleGenerateSchedule}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex-1"
                >
                  إنشاء/تحديث الجدول المعروض
                </button>
                <button
                  type="button"
                  onClick={handleSaveSchedule}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 flex-1"
                >
                  حفظ بيانات النموذج الحالية
                </button>
              </div>
            </form>
          </div>
          <div
            ref={scheduleOutputRef}
            id="scheduleOutputContainer"
            className={`${
              scheduleOutput.show ? "" : "hidden"
            } mt-12 bg-white rounded-xl shadow-lg p-2 md:p-4 max-w-full mx-auto`}
          >
            <div className="text-center mb-2">
              <div
                id="universityInfoForTable"
                className="text-sm text-gray-700 mt-1 mb-2"
                dangerouslySetInnerHTML={{
                  __html: scheduleOutput.universityInfoForTable,
                }}
              ></div>
            </div>
            <div id="scheduleTablesArea">
              {scheduleOutput.tables.length > 0
                ? scheduleOutput.tables.map((tableData, tableIdx) => (
                    <div
                      key={tableData.id}
                      id={tableData.id}
                      className="table-container schedule-segment"
                      ref={(el) => (tableRefs.current[tableIdx] = el)}
                    >
                      <h3 className="segment-title text-gray-800">
                        {tableData.title}
                      </h3>
                      <table className="table-fixed text-sm w-full">
                        <thead>
                          <tr>
                            <th className="sticky-col-main-group" rowSpan="2">
                              التقسيم
                            </th>
                            <th className="sticky-col-section" rowSpan="2">
                              السكشن
                            </th>
                            {tableData.daysHeader.map((day) => (
                              <th
                                key={day}
                                colSpan={Math.max(
                                  1,
                                  scheduleOutput.timeSlots12hrDisplay.length
                                )}
                                className="sticky-header"
                              >
                                {day}
                              </th>
                            ))}
                          </tr>
                          <tr>
                            {tableData.daysHeader.map((day) =>
                              scheduleOutput.timeSlots12hrDisplay.length ===
                              0 ? (
                                <th
                                  key={`${day}-te`}
                                  className="sticky-time-header time-header"
                                >
                                  -
                                </th>
                              ) : (
                                scheduleOutput.timeSlots12hrDisplay.map(
                                  (s12) => (
                                    <th
                                      key={`${day}-${s12}`}
                                      className="sticky-time-header time-header"
                                    >
                                      {formatTime12HeaderDisplay(s12)}
                                    </th>
                                  )
                                )
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.rows.map((row) => (
                            <tr key={row.id}>
                              {row.isFirstOfGroup && (
                                <td
                                  className="sticky-col-main-group bg-blue-50"
                                  rowSpan={row.rowSpanGroupName}
                                >
                                  <div className="vertical-main-group-name">
                                    {row.groupName}
                                  </div>
                                </td>
                              )}
                              <td className="sticky-col-section bg-white font-medium">
                                {row.sectionName}
                              </td>
                              {row.timeCells.map(
                                (cell) =>
                                  !cell.isHidden && (
                                    <td
                                      key={cell.id}
                                      colSpan={cell.colSpan}
                                      rowSpan={cell.rowSpan}
                                      className={
                                        cell.content
                                          ? cell.type === "lecture"
                                            ? "has-lecture-cell"
                                            : "has-section-cell"
                                          : ""
                                      }
                                    >
                                      {cell.content && (
                                        <div
                                          className={`merged-cell ${
                                            cell.type === "lecture"
                                              ? "lecture-cell"
                                              : "section-cell"
                                          }`}
                                          data-tooltip={cell.tooltip}
                                        >
                                          <div className="vertical-text">
                                            {cell.content}
                                            {cell.location &&
                                              cell.location !== "N/A" && (
                                                <span className="location-text">
                                                  ({cell.location})
                                                </span>
                                              )}
                                          </div>
                                        </div>
                                      )}
                                    </td>
                                  )
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))
                : scheduleOutput.show && (
                    <p className="text-center text-orange-500 py-4">
                      لا توجد بيانات لعرضها. يرجى التأكد من إدخال بيانات صالحة
                      وإنشاء الجدول.
                    </p>
                  )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Generation;
