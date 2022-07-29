export const getParamsPokemon = (url: string): { offset: string, limit: string } => {
  const obj_url = new URL(url);
  const offset = obj_url.searchParams.get('offset') || '';
  const limit = obj_url.searchParams.get('limit') || '';
  return {offset, limit}
}
