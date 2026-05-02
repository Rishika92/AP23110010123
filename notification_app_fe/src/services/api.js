export const fetchNotifications = async () => {
  try {
    const res = await fetch("/api/notifications");

    if (!res.ok) return [];

    const data = await res.json();
    const notifications = data?.notifications || [];

    // Priority mapping
    const priorityMap = {
      Placement: 3,
      Result: 2,
      Event: 1
    };

    // Sort logic
    const sorted = notifications.sort((a, b) => {
      const priorityDiff =
        (priorityMap[b.Type] || 0) - (priorityMap[a.Type] || 0);

      if (priorityDiff !== 0) return priorityDiff;

      // If same type → sort by latest timestamp
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    // Return top 10
    return sorted.slice(0, 10);

  } catch (error) {
    return [];
  }
};