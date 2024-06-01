package com.course_manage.cms.repository;

import com.course_manage.cms.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Check if a user with the given email already exists
    boolean existsByEmail(String email);
    // when input check email exist
    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.email = :email AND u.password = :password")
    User findByEmailAndPassword(@Param("email") String email, @Param("password") String password);


    boolean existsByEmailAndPassword(String email, String password);

    // signup
    // Insert a new user with the given email and password
    @Modifying
    @Transactional
    @Query(value = "INSERT INTO users (email, password, is_admin, created_at, updated_at) VALUES (:email, :password, :isAdmin, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)", nativeQuery = true)
    void insertUser(@Param("email") String email, @Param("password") String password, @Param("isAdmin") boolean isAdmin);

}