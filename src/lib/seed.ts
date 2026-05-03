import dbConnect from '@/lib/mongodb';
import HeroSlide from '@/models/HeroSlide';
import Service from '@/models/Service';
import Project from '@/models/Project';
import Stat from '@/models/Stat';
import Testimonial from '@/models/Testimonial';
import TeamMember from '@/models/TeamMember';
import CompanyInfo from '@/models/CompanyInfo';

export async function seedDatabase() {
  await dbConnect();

  // Clear existing data
  await Promise.all([
    HeroSlide.deleteMany({}),
    Service.deleteMany({}),
    Project.deleteMany({}),
    Stat.deleteMany({}),
    Testimonial.deleteMany({}),
    TeamMember.deleteMany({}),
    CompanyInfo.deleteMany({}),
  ]);

  // Hero Slides
  await HeroSlide.insertMany([
    {
      title: 'Membangun Masa Depan & Impian',
      subtitle: 'Civilize hadir sebagai mitra konstruksi terpercaya dengan pengalaman lebih dari 25 tahun dalam membangun infrastruktur berkualitas tinggi di seluruh Indonesia.',
      backgroundImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80',
      ctaText: 'Lihat Proyek Kami',
      ctaLink: '#proyek',
      order: 0,
    },
    {
      title: 'Kualitas Tanpa Kompromi',
      subtitle: 'Setiap proyek kami dibangun dengan standar tertinggi, menggunakan material premium dan teknologi konstruksi terdepan.',
      backgroundImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
      ctaText: 'Tentang Kami',
      ctaLink: '#tentang',
      order: 1,
    },
    {
      title: 'Inovasi dalam Setiap Struktur',
      subtitle: 'Kami menggabungkan desain modern dengan teknik konstruksi inovatif untuk menciptakan bangunan yang kokoh dan estetis.',
      backgroundImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
      ctaText: 'Hubungi Kami',
      ctaLink: '#kontak',
      order: 2,
    },
  ]);

  // Services
  await Service.insertMany([
    {
      title: 'Konstruksi Komersial',
      slug: 'konstruksi-komersial',
      description: 'Pembangunan gedung perkantoran, pusat perbelanjaan, dan fasilitas komersial dengan standar internasional.',
      longDescription: 'Civilize memiliki rekam jejak yang solid dalam pembangunan proyek komersial berskala besar. Kami menangani seluruh proses dari perencanaan hingga penyerahan kunci, memastikan setiap detail memenuhi standar internasional. Tim ahli kami berpengalaman dalam membangun gedung perkantoran bertingkat, pusat perbelanjaan modern, hotel berbintang, dan berbagai fasilitas komersial lainnya. Dengan pendekatan manajemen proyek yang terstruktur, kami menjamin ketepatan waktu dan efisiensi biaya tanpa mengorbankan kualitas.',
      icon: 'Building2',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      features: ['Gedung perkantoran bertingkat', 'Pusat perbelanjaan', 'Hotel & hospitality', 'Fasilitas kesehatan', 'Manajemen proyek terintegrasi'],
      order: 0,
    },
    {
      title: 'Konstruksi Residensial',
      slug: 'konstruksi-residensial',
      description: 'Pembangunan hunian berkualitas tinggi dari rumah pribadi hingga kompleks perumahan premium.',
      longDescription: 'Kami mewujudkan rumah impian Anda dengan perhatian detail pada setiap aspek konstruksi. Dari desain arsitektur hingga finishing interior, tim Civilize bekerja sama dengan Anda untuk menciptakan hunian yang nyaman, aman, dan bernilai estetika tinggi. Kami menangani proyek residensial mulai dari rumah pribadi custom hingga pengembangan perumahan berskala besar, selalu dengan komitmen terhadap kualitas material dan standar keamanan tertinggi.',
      icon: 'Home',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      features: ['Rumah custom mewah', 'Perumahan cluster', 'Apartemen & kondominium', 'Renovasi residensial', 'Desain berkelanjutan'],
      order: 1,
    },
    {
      title: 'Renovasi & Restorasi',
      slug: 'renovasi-restorasi',
      description: 'Layanan renovasi menyeluruh untuk memperbarui dan meningkatkan fungsi bangunan yang sudah ada.',
      longDescription: 'Civilize menawarkan layanan renovasi komprehensif yang mengubah bangunan lama menjadi ruang modern yang fungsional. Tim kami ahli dalam merenovasi berbagai jenis bangunan, dari gedung bersejarah yang memerlukan restorasi sensitif hingga ruang komersial yang membutuhkan pembaruan total. Kami memahami tantangan unik renovasi dan memiliki solusi kreatif untuk setiap proyek.',
      icon: 'Hammer',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
      features: ['Renovasi gedung bersejarah', 'Retrofit struktural', 'Pembaruan interior', 'Peningkatan sistem MEP', 'Sertifikasi green building'],
      order: 2,
    },
    {
      title: 'Infrastruktur',
      slug: 'infrastruktur',
      description: 'Pembangunan infrastruktur publik termasuk jalan, jembatan, dan fasilitas umum.',
      longDescription: 'Dengan kapasitas teknis yang mumpuni dan armada peralatan berat yang lengkap, Civilize mampu menangani proyek infrastruktur berskala besar. Kami telah berkontribusi dalam pembangunan jalan tol, jembatan, bendungan, dan berbagai proyek infrastruktur vital lainnya di seluruh Indonesia. Keahlian kami mencakup perencanaan, pelaksanaan, hingga pemeliharaan infrastruktur dengan standar keselamatan tertinggi.',
      icon: 'LandPlot',
      image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
      features: ['Jalan & jalan tol', 'Jembatan & flyover', 'Drainase & irigasi', 'Pelabuhan & dermaga', 'Fasilitas publik'],
      order: 3,
    },
    {
      title: 'Desain Interior',
      slug: 'desain-interior',
      description: 'Perancangan dan pelaksanaan interior yang fungsional, estetis, dan sesuai kebutuhan klien.',
      longDescription: 'Tim desain interior Civilize menciptakan ruang yang tidak hanya indah dipandang tetapi juga fungsional dan nyaman. Kami bekerja dengan material berkualitas tinggi dan mengikuti tren desain terkini untuk menghasilkan interior yang mencerminkan identitas dan kebutuhan klien kami. Dari konsep hingga eksekusi, kami memastikan setiap elemen interior terkoordinasi dengan harmonis.',
      icon: 'Paintbrush',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
      features: ['Desain konseptual', 'Fit-out kantor', 'Interior residensial', 'Retail & hospitality', 'Furnitur custom'],
      order: 4,
    },
    {
      title: 'Manajemen Proyek',
      slug: 'manajemen-proyek',
      description: 'Pengelolaan proyek konstruksi secara menyeluruh dari perencanaan hingga serah terima.',
      longDescription: 'Layanan manajemen proyek Civilize memastikan setiap aspek proyek konstruksi Anda berjalan sesuai rencana. Tim manajer proyek bersertifikasi kami mengelola scope, jadwal, biaya, dan kualitas dengan pendekatan sistematis dan transparan. Kami menggunakan teknologi terkini termasuk BIM (Building Information Modeling) untuk perencanaan yang lebih akurat dan efisien.',
      icon: 'ClipboardList',
      image: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&q=80',
      features: ['Perencanaan & penjadwalan', 'Pengendalian biaya', 'Quality assurance', 'BIM integration', 'Pelaporan berkala'],
      order: 5,
    },
  ]);

  // Projects
  await Project.insertMany([
    // KOMERSIAL
    {
      title: 'Menara Civilize Tower',
      slug: 'menara-civilize-tower',
      category: 'Komersial',
      description: 'Gedung perkantoran 35 lantai dengan desain modern premium dan sertifikasi green building.',
      longDescription: 'Menara Civilize Tower merupakan proyek prestisius gedung perkantoran 35 lantai yang berlokasi di jantung kota. Dengan konsep green building dan sertifikasi LEED Gold, bangunan ini dilengkapi dengan sistem smart building terkini.',
      images: ['/images/projects/komersial_tower.png'],
      client: 'PT Graha Sentosa',
      location: 'Jakarta',
      year: 2024,
      duration: '30 bulan',
      value: 'Rp 450 Miliar',
      featured: true,
    },
    {
      title: 'Mall Grand Nusantara',
      slug: 'mall-grand-nusantara',
      category: 'Komersial',
      description: 'Kawasan ritel premium dengan plaza luar ruangan elegan dan pencahayaan spektakuler.',
      longDescription: 'Pusat perbelanjaan modern yang mendefinisikan ulang lanskap ritel. Memiliki plaza outdoor yang elegan, atap melengkung raksasa, dan perpaduan arsitektur simetris yang memberikan pengalaman berbelanja mewah.',
      images: ['/images/projects/komersial_mall.png'],
      client: 'Nusantara Retail Group',
      location: 'Surabaya',
      year: 2023,
      duration: '24 bulan',
      value: 'Rp 800 Miliar',
      featured: true,
    },
    {
      title: 'Horizon Business Park',
      slug: 'horizon-business-park',
      category: 'Komersial',
      description: 'Kompleks perkantoran korporat high-end dengan pemandangan taman landscaping eksklusif.',
      longDescription: 'Desain minimalis modern dengan kaca full-height yang membiarkan cahaya alami masuk. Dikelilingi taman presisi tinggi, menjadikannya fasilitas perkantoran hijau terbaik di area tersebut.',
      images: ['/images/projects/komersial_park.png'],
      client: 'Horizon Holdings',
      location: 'Bandung',
      year: 2022,
      duration: '18 bulan',
      value: 'Rp 220 Miliar',
      featured: false,
    },

    // RESIDENSIAL
    {
      title: 'Greenfield Eco Residence',
      slug: 'greenfield-eco-residence',
      category: 'Residensial',
      description: 'Rumah bandar modern ramah lingkungan dengan fasilitas panel surya dan material alami.',
      longDescription: 'Kompleks townhouse ultra-modern yang memadukan panel kayu mewah dan fasilitas ramah lingkungan. Dilengkapi solusi energi nol bersih (net-zero energy) untuk kehidupan di masa depan.',
      images: ['/images/projects/residensial_eco.png'],
      client: 'EcoLiving Estate',
      location: 'Bogor',
      year: 2024,
      duration: '14 bulan',
      value: 'Rp 150 Miliar',
      featured: true,
    },
    {
      title: 'Sky Gardens Apartments',
      slug: 'sky-gardens-apartments',
      category: 'Residensial',
      description: 'Menara apartemen futuristik premium dengan infinity pool dan pemandangan tanpa henti.',
      longDescription: 'Pencakar langit hunian yang memberikan definisi baru pada kemewahan vertikal. Setiap unit memiliki balkon lebar dan akses ke fasilitas bintang lima, termasuk kolam renang tanpa batas di atap.',
      images: ['/images/projects/residensial_sky.png'],
      client: 'Skyline Properties',
      location: 'Jakarta',
      year: 2025,
      duration: '36 bulan',
      value: 'Rp 1.2 Triliun',
      featured: true,
    },
    {
      title: 'The Crestwood Estate',
      slug: 'the-crestwood-estate',
      category: 'Residensial',
      description: 'Kawasan vila eksklusif kustom yang dirancang minimalis-modern dengan beton dan kaca.',
      longDescription: 'Vila pribadi mewah dengan fasilitas private pool, ruang terbuka elegan, dan arsitektur kelas atas. Dibangun bagi klien elit yang mengutamakan privasi dan estetika modern sempurna.',
      images: ['/images/projects/residensial_villas.png'],
      client: 'Private Client',
      location: 'Bali',
      year: 2023,
      duration: '12 bulan',
      value: 'Rp 85 Miliar',
      featured: false,
    },

    // INFRASTRUKTUR
    {
      title: 'Jembatan Nusantara III',
      slug: 'jembatan-nusantara-iii',
      category: 'Infrastruktur',
      description: 'Jembatan bentang panjang raksasa menghubungkan dua titik vital kepulauan.',
      longDescription: 'Keajaiban teknik modern; jembatan gantung raksasa ini berdiri teguh di atas perairan dalam. Kami mengeksekusi struktur ini dengan presisi tertinggi menggunakan beton dan baja khusus anti-korosi.',
      images: ['/images/projects/infrastruktur_bridge.png'],
      client: 'Kementerian PUPR',
      location: 'Selat Sunda',
      year: 2026,
      duration: '48 bulan',
      value: 'Rp 4.5 Triliun',
      featured: true,
    },
    {
      title: 'Bendungan Air Sejahtera',
      slug: 'bendungan-air-sejahtera',
      category: 'Infrastruktur',
      description: 'Bendungan beton raksasa bernilai triliunan rupiah dengan skala infrastruktur raksasa.',
      longDescription: 'Proyek bendungan mega-infrastruktur yang terletak di antara pegunungan, menyimpan kapasitas air yang sangat besar dan menjadi sumber PLTA andalan sekaligus pencegah banjir tahunan.',
      images: ['/images/projects/infrastruktur_dam.png'],
      client: 'Pemerintah Provinsi',
      location: 'Jawa Tengah',
      year: 2024,
      duration: '60 bulan',
      value: 'Rp 3.1 Triliun',
      featured: true,
    },
    {
      title: 'Terminal Internasional Civilize',
      slug: 'terminal-internasional-civilize',
      category: 'Infrastruktur',
      description: 'Pusat transportasi penerbangan modern dengan lengkungan arsitektur futuristik.',
      longDescription: 'Fasilitas mutakhir untuk penerbangan internasional. Menghadirkan desain lengkungan atap kaca canggih yang memberikan pencahayaan alami serta sistem sirkulasi penumpang kelas dunia.',
      images: ['/images/projects/infrastruktur_airport.png'],
      client: 'Angkasa Pura',
      location: 'Yogyakarta',
      year: 2025,
      duration: '32 bulan',
      value: 'Rp 2.8 Triliun',
      featured: false,
    },

    // RENOVASI
    {
      title: 'Heritage Hotel Restoration',
      slug: 'heritage-hotel-restoration',
      category: 'Renovasi',
      description: 'Restorasi otentik hotel era kolonial yang dipugar dengan fasilitas kemewahan modern.',
      longDescription: 'Upaya pemugaran sangat hati-hati terhadap bangunan bersejarah awal tahun 1900-an. Fasad berwarna putih direstorasi, dan interior dilengkapi infrastruktur modern bintang lima tanpa merusak pesona klasiknya.',
      images: ['/images/projects/renovasi_hotel.png'],
      client: 'Heritage Group',
      location: 'Semarang',
      year: 2022,
      duration: '16 bulan',
      value: 'Rp 140 Miliar',
      featured: true,
    },
    {
      title: 'Metro Station Retrofit',
      slug: 'metro-station-retrofit',
      category: 'Renovasi',
      description: 'Fasilitas komuter bawah tanah yang direnovasi ulang dengan material baja dan kaca premium.',
      longDescription: 'Memperbarui stasiun metro kuno menjadi hub komuter yang ultra-modern. Pembaruan meliputi penggantian utilitas berusia puluhan tahun dengan arsitektur baja elegan.',
      images: ['/images/projects/renovasi_station.png'],
      client: 'PT KAI',
      location: 'Jakarta',
      year: 2023,
      duration: '14 bulan',
      value: 'Rp 95 Miliar',
      featured: false,
    },
    {
      title: 'Emerald Plaza Upcycling',
      slug: 'emerald-plaza-upcycling',
      category: 'Renovasi',
      description: 'Pembaruan total fasad ruang komersial menjadi area publik gaya arsitektur kontemporer.',
      longDescription: 'Sebuah plasa berusia 30 tahun direnovasi sepenuhnya dari luar dalam. Fasilitas baru menggunakan panel kayu mewah, instalasi ramah pejalan kaki, serta area ritel semi-outdoor kekinian.',
      images: ['/images/projects/renovasi_plaza.png'],
      client: 'Emerald Corp',
      location: 'Medan',
      year: 2024,
      duration: '11 bulan',
      value: 'Rp 65 Miliar',
      featured: true,
    },
  ]);

  // Stats
  await Stat.insertMany([
    { value: 25, label: 'Tahun Pengalaman', suffix: '+' },
    { value: 500, label: 'Proyek Selesai', suffix: '+' },
    { value: 150, label: 'Tim Profesional', suffix: '+' },
    { value: 98, label: 'Kepuasan Klien', suffix: '%' },
  ]);

  // Testimonials
  await Testimonial.insertMany([
    {
      name: 'Budi Hartono',
      role: 'Direktur Utama',
      company: 'PT Graha Sentosa',
      content: 'Civilize menyelesaikan proyek gedung kantor kami tepat waktu dan melebihi ekspektasi. Kualitas pekerjaan dan profesionalisme tim mereka sangat luar biasa. Kami sangat merekomendasikan Civilize untuk proyek konstruksi apapun.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      rating: 5,
    },
    {
      name: 'Siti Rahayu',
      role: 'Project Manager',
      company: 'PT Hunian Hijau Lestari',
      content: 'Kolaborasi dengan Civilize di proyek Greenfield Residence sangat memuaskan. Mereka tidak hanya memenuhi standar kualitas yang kami tetapkan, tetapi juga memberikan solusi inovatif yang meningkatkan efisiensi proyek secara keseluruhan.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      rating: 5,
    },
    {
      name: 'Ahmad Wijaya',
      role: 'Kepala Divisi Infrastruktur',
      company: 'Kementerian PUPR',
      content: 'Proyek Jembatan Nusantara III membuktikan kapabilitas Civilize dalam menangani proyek infrastruktur berskala besar. Komitmen mereka terhadap keselamatan kerja dan kualitas konstruksi patut diapresiasi.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      rating: 5,
    },
    {
      name: 'Maya Kusuma',
      role: 'Owner',
      company: 'PT Heritage Hospitality',
      content: 'Renovasi Hotel Heritage kami memerlukan kepekaan tinggi terhadap detail bersejarah. Tim Civilize berhasil menyeimbangkan preservasi warisan dengan kebutuhan modern secara sempurna. Hasil akhirnya sangat memukau.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
      rating: 5,
    },
  ]);

  // Team Members
  await TeamMember.insertMany([
    {
      name: 'Ir. Dharma Putra, M.T.',
      slug: 'dharma-putra',
      role: 'Direktur Utama & Founder',
      bio: 'Berpengalaman lebih dari 30 tahun di industri konstruksi Indonesia.',
      fullBio: 'Ir. Dharma Putra, M.T. adalah pendiri dan Direktur Utama Civilize yang telah berkiprah di industri konstruksi selama lebih dari 30 tahun. Lulusan Teknik Sipil ITB dan Master dari TU Delft Belanda, beliau memiliki visi untuk menghadirkan standar konstruksi internasional di Indonesia. Di bawah kepemimpinannya, Civilize telah berkembang dari perusahaan kecil menjadi salah satu kontraktor terpercaya di Indonesia dengan portofolio proyek senilai lebih dari Rp 5 Triliun.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      certifications: ['PMP Certified', 'LEED AP', 'SKA Utama'],
      experience: '30+ tahun',
      order: 0,
    },
    {
      name: 'Dr. Eng. Rina Wijayanti',
      slug: 'rina-wijayanti',
      role: 'Direktur Teknik',
      bio: 'Pakar struktural dengan keahlian di pembangunan gedung tinggi dan jembatan.',
      fullBio: 'Dr. Eng. Rina Wijayanti adalah Direktur Teknik Civilize yang bertanggung jawab atas seluruh aspek teknis proyek. Meraih gelar Doktor dari Tokyo University bidang Structural Engineering, beliau memiliki keahlian khusus dalam desain dan konstruksi gedung bertingkat tinggi serta jembatan bentang panjang. Beliau aktif sebagai pembicara di konferensi internasional dan telah mempublikasikan lebih dari 20 jurnal ilmiah.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      certifications: ['Structural Engineer PE', 'BIM Manager', 'ISO 9001 Lead Auditor'],
      experience: '22+ tahun',
      order: 1,
    },
    {
      name: 'Hendra Susanto, S.T., M.M.',
      slug: 'hendra-susanto',
      role: 'Direktur Operasional',
      bio: 'Mengelola operasional proyek-proyek besar di seluruh Indonesia.',
      fullBio: 'Hendra Susanto memimpin operasional seluruh proyek Civilize di berbagai lokasi di Indonesia. Dengan latar belakang Teknik Sipil dan Magister Manajemen, beliau menggabungkan keahlian teknis dengan kemampuan manajerial yang kuat. Beliau telah berhasil mengelola lebih dari 100 proyek dengan total nilai melebihi Rp 3 Triliun, dengan track record ketepatan waktu 95%.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
      certifications: ['PMP Certified', 'Six Sigma Black Belt', 'OHSAS 18001'],
      experience: '20+ tahun',
      order: 2,
    },
    {
      name: 'Anisa Permata, S.Ars., IAI',
      slug: 'anisa-permata',
      role: 'Kepala Divisi Desain',
      bio: 'Arsitek berpengalaman dengan fokus pada desain berkelanjutan.',
      fullBio: 'Anisa Permata memimpin divisi desain Civilize dengan pendekatan yang mengutamakan keberlanjutan dan inovasi. Anggota Ikatan Arsitek Indonesia (IAI) ini telah merancang berbagai proyek ikonik termasuk Menara Civilize Tower dan Greenfield Residence. Gaya desainnya yang menggabungkan estetika modern dengan prinsip arsitektur tropis telah meraih beberapa penghargaan desain nasional.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
      certifications: ['IAI Certified', 'LEED AP BD+C', 'Greenship AP'],
      experience: '15+ tahun',
      order: 3,
    },
  ]);

  // Company Info
  await CompanyInfo.create({
    name: 'Civilize',
    tagline: 'Membangun Masa Depan, Mewujudkan Impian',
    about: 'Civilize adalah perusahaan konstruksi terkemuka di Indonesia yang telah berpengalaman lebih dari 25 tahun dalam menyediakan layanan konstruksi berkualitas tinggi. Didirikan pada tahun 1999, kami telah menyelesaikan lebih dari 500 proyek di berbagai sektor termasuk komersial, residensial, infrastruktur, dan renovasi. Dengan tim profesional yang berdedikasi dan berkomitmen terhadap standar tertinggi, Civilize terus menjadi pilihan utama bagi klien yang menginginkan hasil konstruksi terbaik.',
    vision: 'Menjadi perusahaan konstruksi paling terpercaya dan inovatif di Asia Tenggara, yang dikenal atas kualitas, integritas, dan keberlanjutan dalam setiap proyek yang dikerjakan.',
    mission: [
      'Menyediakan layanan konstruksi berkualitas tinggi yang melampaui ekspektasi klien.',
      'Menerapkan teknologi dan inovasi terkini dalam setiap aspek konstruksi.',
      'Mengutamakan keselamatan kerja dan kelestarian lingkungan.',
      'Mengembangkan sumber daya manusia yang kompeten dan profesional.',
      'Berkontribusi pada pembangunan infrastruktur Indonesia yang berkelanjutan.',
    ],
    phone: '+62 21 5555 8888',
    email: 'info@civilize.co.id',
    address: 'Jl. Jenderal Sudirman Kav. 52-53, Gedung Civilize Tower Lt. 25, Jakarta Selatan 12190',
    socialLinks: {
      instagram: 'https://instagram.com/civilize.id',
      linkedin: 'https://linkedin.com/company/civilize',
      facebook: 'https://facebook.com/civilize.id',
      youtube: 'https://youtube.com/@civilize',
    },
    certifications: [
      'ISO 9001:2015 - Quality Management',
      'ISO 14001:2015 - Environmental Management',
      'ISO 45001:2018 - Occupational Health & Safety',
      'OHSAS 18001 - Safety Management',
      'Sertifikasi Badan Usaha (SBU) Grade 7',
      'Green Building Council Indonesia Member',
    ],
  });

  return { success: true, message: 'Database seeded successfully' };
}
