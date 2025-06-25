import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi | Visual Kitha CMS',
  description: 'Kebijakan privasi yang menjelaskan bagaimana Visual Kitha mengumpulkan, menggunakan, dan melindungi data Anda.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-4xl">Kebijakan Privasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>Pembaruan terakhir: 21 Juni 2024</p>
            
            <p>Visual Kitha ("kami", "milik kami", atau "kita") mengoperasikan situs web [URL Situs Web Anda] ("Layanan"). Halaman ini memberitahu Anda tentang kebijakan kami mengenai pengumpulan, penggunaan, dan pengungkapan data pribadi saat Anda menggunakan Layanan kami dan pilihan yang telah Anda kaitkan dengan data tersebut.</p>

            <p>Kami menggunakan data Anda untuk menyediakan dan meningkatkan Layanan. Dengan menggunakan Layanan, Anda setuju dengan pengumpulan dan penggunaan informasi sesuai dengan kebijakan ini.</p>

            <h3 className="font-headline text-2xl mt-8 mb-4">Pengumpulan dan Penggunaan Informasi</h3>
            <p>Kami mengumpulkan beberapa jenis informasi yang berbeda untuk berbagai tujuan guna menyediakan dan meningkatkan Layanan kami kepada Anda.</p>

            <h4>Jenis Data yang Dikumpulkan</h4>
            <ul>
              <li><strong>Data Pribadi:</strong> Saat menggunakan Layanan kami, kami mungkin meminta Anda untuk memberikan kami informasi pengenal pribadi tertentu yang dapat digunakan untuk menghubungi atau mengidentifikasi Anda ("Data Pribadi"). Informasi yang dapat diidentifikasi secara pribadi dapat mencakup, tetapi tidak terbatas pada: Alamat email, Nama depan dan belakang, Nomor telepon.</li>
              <li><strong>Data Penggunaan:</strong> Kami juga dapat mengumpulkan informasi tentang bagaimana Layanan diakses dan digunakan ("Data Penggunaan"). Data Penggunaan ini dapat mencakup informasi seperti alamat Protokol Internet komputer Anda (misalnya alamat IP), jenis browser, versi browser, halaman Layanan kami yang Anda kunjungi, waktu dan tanggal kunjungan Anda, waktu yang dihabiskan di halaman tersebut, pengidentifikasi perangkat unik dan data diagnostik lainnya.</li>
            </ul>

            <h3 className="font-headline text-2xl mt-8 mb-4">Penggunaan Data</h3>
            <p>Visual Kitha menggunakan data yang dikumpulkan untuk berbagai tujuan:</p>
            <ul>
                <li>Untuk menyediakan dan memelihara Layanan</li>
                <li>Untuk memberitahu Anda tentang perubahan pada Layanan kami</li>
                <li>Untuk memungkinkan Anda berpartisipasi dalam fitur interaktif Layanan kami ketika Anda memilih untuk melakukannya</li>
                <li>Untuk menyediakan layanan pelanggan dan dukungan</li>
                <li>Untuk memberikan analisis atau informasi berharga sehingga kami dapat meningkatkan Layanan</li>
                <li>Untuk memantau penggunaan Layanan</li>
                <li>Untuk mendeteksi, mencegah, dan mengatasi masalah teknis</li>
            </ul>

            <h3 className="font-headline text-2xl mt-8 mb-4">Keamanan Data</h3>
            <p>Keamanan data Anda penting bagi kami, tetapi ingatlah bahwa tidak ada metode transmisi melalui Internet, atau metode penyimpanan elektronik yang 100% aman. Meskipun kami berusaha untuk menggunakan cara yang dapat diterima secara komersial untuk melindungi Data Pribadi Anda, kami tidak dapat menjamin keamanan mutlaknya.</p>
            
            <h3 className="font-headline text-2xl mt-8 mb-4">Perubahan pada Kebijakan Privasi Ini</h3>
            <p>Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberitahu Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini.</p>
            <p>Anda disarankan untuk meninjau Kebijakan Privasi ini secara berkala untuk setiap perubahan. Perubahan pada Kebijakan Privasi ini efektif ketika diposting di halaman ini.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
