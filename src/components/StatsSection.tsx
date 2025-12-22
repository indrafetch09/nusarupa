const stats = [
  { value: "2 0K+", label: "Relawan Aktif" },
  { value: "500+", label: "Program Selesai" },
  { value: "34", label: "Provinsi Terjangkau" },
  { value: "1M+", label: "Masyarakat Terbantu" },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
