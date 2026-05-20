package com.example.ucm_discuss_be.seeders;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
// import org.springframework.boot.security.autoconfigure.SecurityProperties.User;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.example.ucm_discuss_be.courses.CourseModel;
import com.example.ucm_discuss_be.courses.CourseRepository;
import com.example.ucm_discuss_be.threads.ThreadModel;
import com.example.ucm_discuss_be.threads.ThreadRepository;
import com.example.ucm_discuss_be.users.UserModel;
import com.example.ucm_discuss_be.users.UserRepository;

@Component
@Profile("dev")
@Order(5)
public class ThreadSeeder implements CommandLineRunner {
    
    @Autowired
    private ThreadRepository threadRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;

    @Override
    public void run(String... args) throws Exception {
        if (threadRepository.count() == 0) {
            System.out.println("Seeding Threads...");
            
            UserModel student = userRepository.findById((long) 1).orElseThrow();
            UserModel student2 = userRepository.findById((long) 2).orElseThrow();
            UserModel student3 = userRepository.findById((long) 3).orElseThrow();
            UserModel student6 = userRepository.findById((long) 6).orElseThrow();

            CourseModel ai = courseRepository.findById((long) 1).orElseThrow();
            CourseModel mobileDev = courseRepository.findById((long) 2).orElseThrow();
            CourseModel database = courseRepository.findById((long) 3).orElseThrow();
            CourseModel egi = courseRepository.findById((long) 4).orElseThrow();
            CourseModel accounting = courseRepository.findById((long) 5).orElseThrow();

            ThreadModel thread1 = new ThreadModel();
            thread1.setTitle("Bagaimana cara mengimplementasikan algoritma A* di Java?");
            thread1.setCourse(ai);
            thread1.setUser(student);
            thread1.setContent("Saya sedang mencoba mengimplementasikan algoritma A* untuk proyek pathfinding, tetapi saya tidak tahu harus mulai dari mana. Apakah ada yang bisa memberikan panduan atau contoh kode di Java?");
            thread1.setIs_anon(false);

            ThreadModel thread2 = new ThreadModel();
            thread2.setTitle("Best practices dalam desain REST API menggunakan Spring Boot");
            thread2.setCourse(mobileDev);
            thread2.setUser(student2);
            thread2.setContent("Apa saja prinsip kunci yang harus diikuti saat merancang API RESTful? Saya terutama tertarik pada versioning dan penanganan error.");
            thread2.setIs_anon(true);

            ThreadModel thread3 = new ThreadModel();
            thread3.setTitle("Memahami SQL Joins dengan Benar");
            thread3.setCourse(database);
            thread3.setUser(student3);
            thread3.setContent("Bisakah seseorang menjelaskan perbedaan antara INNER JOIN, LEFT JOIN, dan RIGHT JOIN dengan contoh sederhana? Saya terus membingungkannya.");
            thread3.setIs_anon(true);

            ThreadModel thread4 = new ThreadModel();
            thread4.setTitle("Ide Proyek Akhir untuk Bahasa Inggris dalam Industri Global");
            thread4.setCourse(egi);
            thread4.setUser(student);
            thread4.setContent("Dosen kami meminta kami untuk mengusulkan proyek akhir. Apakah ada yang memiliki ide menarik yang menggabungkan komunikasi bahasa Inggris dan teknologi?");
            thread4.setIs_anon(false);

            ThreadModel thread5 = new ThreadModel();
            thread5.setTitle("Metode Depresiasi dalam Akuntansi");
            thread5.setCourse(accounting);
            thread5.setUser(student6);
            thread5.setContent("Apa perbedaan antara metode garis lurus dan metode penurunan saldo untuk depresiasi aset? Metode mana yang lebih umum digunakan?");
            thread5.setIs_anon(false);

            ThreadModel thread6 = new ThreadModel();
            thread6.setTitle("Tips untuk Meningkatkan Akurasi Model Machine Learning");
            thread6.setCourse(ai);
            thread6.setUser(student2);
            thread6.setContent("Model saya selalu overfitting. Bagaimana cara mengatasi masalah ini? Apa teknik regularisasi terbaik yang bisa digunakan?");
            thread6.setIs_anon(true);

            ThreadModel thread7 = new ThreadModel();
            thread7.setTitle("React Native vs Flutter: Mana yang Lebih Baik?");
            thread7.setCourse(mobileDev);
            thread7.setUser(student3);
            thread7.setContent("Saya harus memilih framework untuk aplikasi mobile saya. Apa keuntungan dan kerugian dari React Native dibandingkan Flutter?");
            thread7.setIs_anon(false);

            ThreadModel thread8 = new ThreadModel();
            thread8.setTitle("Strategi Backup Database yang Efektif");
            thread8.setCourse(database);
            thread8.setUser(student);
            thread8.setContent("Apa strategi terbaik untuk melakukan backup database production? Seberapa sering kita harus melakukan backup?");
            thread8.setIs_anon(false);

            ThreadModel thread9 = new ThreadModel();
            thread9.setTitle("Teknik Presentasi Efektif dalam Bahasa Inggris");
            thread9.setCourse(egi);
            thread9.setUser(student6);
            thread9.setContent("Saya akan melakukan presentasi di depan klien internasional. Apa tips untuk memberikan presentasi yang bagus dan confident dalam bahasa Inggris?");
            thread9.setIs_anon(false);

            ThreadModel thread10 = new ThreadModel();
            thread10.setTitle("Perhitungan Pajak Penghasilan untuk Freelancer");
            thread10.setCourse(accounting);
            thread10.setUser(student2);
            thread10.setContent("Saya baru mulai bekerja sebagai freelancer. Bagaimana cara menghitung dan melaporkan pajak penghasilan dengan benar?");
            thread10.setIs_anon(true);

            ThreadModel thread11 = new ThreadModel();
            thread11.setTitle("Pengenalan Wajah dengan Deep Learning");
            thread11.setCourse(ai);
            thread11.setUser(student3);
            thread11.setContent("Saya ingin belajar tentang facial recognition menggunakan CNN. Di mana saya bisa menemukan dataset yang baik untuk melatih model?");
            thread11.setIs_anon(true);

            ThreadModel thread12 = new ThreadModel();
            thread12.setTitle("Optimisasi Performa Aplikasi Mobile");
            thread12.setCourse(mobileDev);
            thread12.setUser(student);
            thread12.setContent("Aplikasi saya sangat lambat ketika mengakses data besar. Bagaimana cara mengoptimalkan performa aplikasi mobile?");
            thread12.setIs_anon(true);

            ThreadModel thread13 = new ThreadModel();
            thread13.setTitle("Penggunaan Index dalam Database");
            thread13.setCourse(database);
            thread13.setUser(student2);
            thread13.setContent("Kapan kita harus menggunakan index? Bagaimana cara membuat index yang efektif tanpa mengorbankan write performance?");
            thread13.setIs_anon(false);

            ThreadModel thread14 = new ThreadModel();
            thread14.setTitle("Menulis Dokumentasi Teknis yang Jelas");
            thread14.setCourse(egi);
            thread14.setUser(student3);
            thread14.setContent("Bagaimana cara menulis dokumentasi teknis yang mudah dipahami oleh tim internasional? Apa struktur yang harus diikuti?");
            thread14.setIs_anon(false);

            ThreadModel thread15 = new ThreadModel();
            thread15.setTitle("Proses Audit Internal dan Eksternal");
            thread15.setCourse(accounting);
            thread15.setUser(student);
            thread15.setContent("Apa perbedaan antara audit internal dan audit eksternal? Bagaimana persiapan perusahaan untuk menghadapi audit?");
            thread15.setIs_anon(false);

            ThreadModel thread16 = new ThreadModel();
            thread16.setTitle("Natural Language Processing untuk Analisis Sentiment");
            thread16.setCourse(ai);
            thread16.setUser(student6);
            thread16.setContent("Saya ingin membuat model untuk analisis sentiment dari teks berbahasa Indonesia. Library apa yang paling cocok untuk digunakan?");
            thread16.setIs_anon(false);

            ThreadModel thread17 = new ThreadModel();
            thread17.setTitle("State Management di React Native");
            thread17.setCourse(mobileDev);
            thread17.setUser(student2);
            thread17.setContent("Haruskah saya menggunakan Redux, Context API, atau MobX untuk state management? Apa kelebihan dan kekurangan masing-masing?");
            thread17.setIs_anon(false);

            ThreadModel thread18 = new ThreadModel();
            thread18.setTitle("Normalisasi Data dalam Database Design");
            thread18.setCourse(database);
            thread18.setUser(student3);
            thread18.setContent("Saya masih bingung dengan konsep normalisasi database. Bisakah dijelaskan dengan contoh praktis dari 1NF hingga 3NF?");
            thread18.setIs_anon(true);

            ThreadModel thread19 = new ThreadModel();
            thread19.setTitle("Komunikasi Lintas Budaya dalam Tim Global");
            thread19.setCourse(egi);
            thread19.setUser(student);
            thread19.setContent("Bagaimana cara berkomunikasi efektif dengan tim yang berasal dari budaya berbeda? Apa etika bisnis yang perlu diperhatikan?");
            thread19.setIs_anon(false);

            ThreadModel thread20 = new ThreadModel();
            thread20.setTitle("Penyusunan Anggaran Tahunan Perusahaan");
            thread20.setCourse(accounting);
            thread20.setUser(student6);
            thread20.setContent("Saya baru ditugaskan untuk menyusun anggaran tahunan perusahaan. Proses apa yang harus diikuti dan data apa yang diperlukan?");
            thread20.setIs_anon(true);

            threadRepository.saveAll(List.of(thread1, thread2, thread3, thread4, thread5, thread6, thread7, thread8, thread9, thread10, 
                                             thread11, thread12, thread13, thread14, thread15, thread16, thread17, thread18, thread19, thread20));

            System.out.println("Threads seeded.");
        }
    }

}
