// Builds a working join link for video consultations from the appointment's
// videoCallingId. Uses a Jitsi Meet room (free, instant, no OAuth) so video
// calls work out of the box. To switch to real Google Meet later, this is the
// single place to change — generate the link via the Google Calendar API when
// the appointment is created and store it on the appointment instead.
const VIDEO_BASE = process.env.NEXT_PUBLIC_VIDEO_BASE_URL || "https://meet.jit.si"

export const getVideoConsultationLink = (videoCallingId?: string): string | null => {
  if (!videoCallingId) return null
  return `${VIDEO_BASE}/meddical-${videoCallingId}`
}
