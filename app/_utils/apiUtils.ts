const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const sendForm = async (data: object): Promise<any> => {
  const response = await fetch(`${baseUrl}/api/form`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
};

export default sendForm;
