import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Syarat & Ketentuan | Visual Kitha CMS',
  description: 'Syarat dan ketentuan penggunaan layanan Visual Kitha.',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-4xl">Syarat & Ketentuan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>Pembaruan terakhir: 21 Juni 2024</p>
            
            <p>Selamat datang di Visual Kitha! Syarat dan ketentuan ini menguraikan aturan dan peraturan untuk penggunaan Situs Web Visual Kitha, yang terletak di [URL Situs Web Anda].</p>

            <p>Dengan mengakses situs web ini, kami menganggap Anda menerima syarat dan ketentuan ini. Jangan terus menggunakan Visual Kitha jika Anda tidak setuju untuk mengambil semua syarat dan ketentuan yang tercantum di halaman ini.</p>

            <h3 className="font-headline text-2xl mt-8 mb-4">Lisensi</h3>
            <p>Kecuali dinyatakan lain, Visual Kitha dan/atau pemberi lisensinya memiliki hak kekayaan intelektual untuk semua materi di Visual Kitha. Semua hak kekayaan intelektual dilindungi undang-undang. Anda dapat mengakses ini dari Visual Kitha untuk penggunaan pribadi Anda dengan tunduk pada batasan yang ditetapkan dalam syarat dan ketentuan ini.</p>

            <p>Anda tidak boleh:</p>
            <ul>
                <li>Menerbitkan ulang materi dari Visual Kitha</li>
                <li>Menjual, menyewakan, atau mensublisensikan materi dari Visual Kitha</li>
                <li>Mereproduksi, menggandakan, atau menyalin materi dari Visual Kitha</li>
                <li>Mendistribusikan kembali konten dari Visual Kitha</li>
            </ul>

            <h3 className="font-headline text-2xl mt-8 mb-4">Batasan Tanggung Jawab</h3>
            <p>Dalam keadaan apa pun, Visual Kitha, maupun direktur, karyawan, mitra, agen, pemasok, atau afiliasinya, tidak akan bertanggung jawab atas segala kerusakan tidak langsung, insidental, khusus, konsekuensial, atau hukuman, termasuk tanpa batasan, kehilangan keuntungan, data, penggunaan, niat baik, atau kerugian tidak berwujud lainnya, yang diakibatkan oleh (i) akses Anda ke atau penggunaan atau ketidakmampuan untuk mengakses atau menggunakan Layanan; (ii) setiap perilaku atau konten dari pihak ketiga mana pun pada Layanan; (iii) konten apa pun yang diperoleh dari Layanan; dan (iv) akses, penggunaan, atau perubahan yang tidak sah atas transmisi atau konten Anda, baik berdasarkan jaminan, kontrak, tort (termasuk kelalaian) atau teori hukum lainnya, baik kami telah diberitahu tentang kemungkinan kerusakan tersebut atau tidak, dan bahkan jika suatu upaya perbaikan yang ditetapkan di sini ditemukan telah gagal dari tujuan esensialnya.</p>

            <h3 className="font-headline text-2xl mt-8 mb-4">Perubahan</h3>
            <p>Kami berhak, atas kebijakan kami sendiri, untuk mengubah atau mengganti Syarat ini kapan saja. Jika revisi bersifat material, kami akan mencoba memberikan pemberitahuan setidaknya 30 hari sebelum syarat baru berlaku. Apa yang merupakan perubahan material akan ditentukan atas kebijakan kami sendiri.</p>

            <p>Dengan terus mengakses atau menggunakan Layanan kami setelah revisi tersebut menjadi efektif, Anda setuju untuk terikat oleh syarat yang direvisi. Jika Anda tidak menyetujui syarat baru, silakan berhenti menggunakan Layanan.</p>

            <h3 className="font-headline text-2xl mt-8 mb-4">Hubungi Kami</h3>
            <p>Jika Anda memiliki pertanyaan tentang Syarat ini, silakan hubungi kami.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
