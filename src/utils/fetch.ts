const protectedFetch = async <T>(url: string, options: RequestInit) => {
	const res = await fetch(url, options);
	const json = await res.json();
	if (!res.ok) throw json;
	return json as T;
};

export default protectedFetch;
