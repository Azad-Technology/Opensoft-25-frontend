const fetchDashboardData = async () => {
    try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/employee/dashboard/`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            throw new Error("Expected JSON but got: " + text);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        // Update stats directly with the new data
        setStats(data);
    } catch (error) {
        setError(error.message);
        console.error("Error fetching dashboard data:", error);
    } finally {
        setLoading(false);
    }
};
