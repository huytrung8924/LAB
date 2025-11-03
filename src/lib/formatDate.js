const formatDate = (datetimeStr) => {
  try {
    // models use strings like "2012-08-30 10:44:23" - replace space with T for ISO
    const s =
      datetimeStr && typeof datetimeStr === "string"
        ? datetimeStr.replace(" ", "T")
        : datetimeStr;
    const d = new Date(s);
    if (isNaN(d.getTime())) {
      return datetimeStr;
    }
    return d.toLocaleString();
  } catch (e) {
    return datetimeStr;
  }
};

export default formatDate;
