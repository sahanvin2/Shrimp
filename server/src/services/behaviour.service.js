export async function recordBehaviourEvents(events = []) {
  try {
    return { accepted: events.length };
  } catch (error) {
    throw error;
  }
}
