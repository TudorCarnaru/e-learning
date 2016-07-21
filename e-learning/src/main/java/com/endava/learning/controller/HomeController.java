package com.endava.learning.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.endava.learning.dao.TopicDAO;

@Controller
public class HomeController {

	@Autowired
	private TopicDAO topicDAO;
	
	@RequestMapping("/")
	public String home(){
		//simpleDao.bla();
		return "home";
	}
}
