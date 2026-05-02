export async function fetchData(url: string): Promise<any> {
    return await fetch(`${process.env.EXPO_PUBLIC_API_URL!}${url}`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}
