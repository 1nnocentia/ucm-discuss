package com.example.ucm_discuss_be.requestInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

// slf4j logging
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

@Component
public class RequestInterceptor implements HandlerInterceptor {
    Logger logger = LoggerFactory.getLogger(RequestInterceptor.class);
    // Request is intercepted by this method before reaching the Controller
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        //* Business logic just when the request is received and intercepted by this interceptor before reaching the controller
        try {
            // logger.info("1 - preHandle() : Before sending request to the Controller");
            logger.info("Method Type: " + request.getMethod());
            logger.info("Request URL: " + request.getRequestURI());
        }
        //* If the Exception is caught, this method will return false
        catch (Exception e) {
            logger.error("Error occurred while processing request : ", e);
            return false;
        }
        return true;
    }

    // Response is intercepted by this method before reaching the client
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        //* Business logic just before the response reaches the client and the request is served
        try {
            logger.info("2 - postHandle() : After the Controller serves the request (before returning back response to the client)");
        }
        catch (Exception e) {
            logger.error("Error occurred while processing request : ", e);
        }
    }

    // This method is called after request & response HTTP communication is done.
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        //* Business logic after request and response is Completed
        try {
            logger.info("3 - afterCompletion() : After the request and Response is completed");
        }
        catch (Exception e) {
            logger.error("Error occurred while processing request : ", e);
        }
    }
}