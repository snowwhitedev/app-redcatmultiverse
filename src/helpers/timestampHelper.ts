import { EARLY_BIRD_END_TIMESTAMP_1, EARLY_BIRD_END_TIMESTAMP_2, EARLY_BIRD_PHASE_1, EARLY_BIRD_PHASE_2, EARLY_BIRD_START_TIMESTAMP_1, EARLY_BIRD_START_TIMESTAMP_2, NO_EARLY_BIRD } from "../config/constants/config";

export const getToastCloseTimeForComingSoon = () => {
  const now = new Date().getTime();
  const distance = EARLY_BIRD_START_TIMESTAMP_1 - now;

  return distance > 0 ? distance : 0;
}

export const getEarlyBirdPhase = () => {
  const now = new Date().getTime();

  if (now >= EARLY_BIRD_START_TIMESTAMP_1 && now < EARLY_BIRD_END_TIMESTAMP_1) {
    const distance = EARLY_BIRD_END_TIMESTAMP_1 - now;
    return { phase: EARLY_BIRD_PHASE_1, distance };
  }

  if (now >= EARLY_BIRD_START_TIMESTAMP_2 && now < EARLY_BIRD_END_TIMESTAMP_2) {
    const distance = EARLY_BIRD_END_TIMESTAMP_2 - now;
    return { phase: EARLY_BIRD_PHASE_2, distance };
  }

  return { phase: NO_EARLY_BIRD, distance: 0 };
}
