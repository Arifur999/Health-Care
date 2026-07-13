const MapEmbed = ({ query = "Dhaka, Bangladesh", className }: { query?: string; className?: string }) => {
  return (
    <iframe
      title="Location map"
      src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
      className={className ?? "h-100 w-full rounded-[5px] border-0"}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}

export default MapEmbed
