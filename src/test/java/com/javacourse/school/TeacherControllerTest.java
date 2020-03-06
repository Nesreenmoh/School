package com.javacourse.school;

import com.javacourse.school.controller.TeatcherController;
import com.javacourse.school.models.Teacher;
import com.javacourse.school.repositories.TeacherRepository;
import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.when;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class TeacherControllerTest {

    // we want now to test the controller and inject mockito to access it
    @InjectMocks
    private TeatcherController teatcherController;

    @Mock
    private TeacherRepository teacherRepository;

    private MockMvc mockMvc;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(teatcherController).build();
    }

    @Test
    public void dummyTest(){
        assertTrue(true);
    }

    @Test
    public void testGet() throws Exception{
        List<Teacher> myteacher = new ArrayList<>();
        myteacher.add(new Teacher(13L, "It is working! ^_^"));
        when(teacherRepository.findAll()).thenReturn(myteacher);
        mockMvc.perform(get("/api/teacher"))
                .andDo(print())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$.[0].id", is(13)))
                .andExpect(jsonPath("$.[0].name", is("It is working! ^_^")))
                .andExpect(status().isOk());
    }

}
