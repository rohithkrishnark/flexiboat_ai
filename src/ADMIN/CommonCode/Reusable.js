export const isValidEmail = (email) => {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email.trim());
};

export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
  });
};

export const formatDateForMySQL = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split("T")[0];
};

export const getWeeklyStats = (data) => {
  if (!data || data.length === 0) return Array(7).fill(0);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  const map = days.reduce((acc, day) => {
    acc[day] = { count: 0, score: 0 };
    return acc;
  }, {});

  data.forEach(({ created_at, activity_score = 0, rejected }) => {
    const day = created_at.split("T")[0];

    if (map[day]) {
      map[day].count += 1;

      // only count score if not rejected (optional logic)
      if (!rejected) {
        map[day].score += activity_score;
      }
    }
  });

  return {
    weeklyActivity: days.map((d) => map[d].count),
    weeklyScore: days.map((d) => map[d].score),
  };
};

export const getWeeklyCount = (data) => {
  if (!data || data.length === 0) return Array(7).fill(0);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  const map = days.reduce((acc, day) => {
    acc[day] = 0;
    return acc;
  }, {});

  data.forEach(({ created_at }) => {
    const day = created_at.split("T")[0];
    if (map[day] !== undefined) {
      map[day] += 1;
    }
  });

  return days.map((d) => map[d]);
};

export const combineDocuments = (details, files) => {
  if (!details) return;
  // 🔥 convert files array to map for fast lookup
  const fileMap = new Map();

  files?.forEach((item) => {
    fileMap.set(item.document_id, item.files);
  });

  // 🔥 merge
  return details?.map((doc) => ({
    ...doc,
    files: fileMap.get(doc.document_id) || [], // fallback empty
  }));
};
