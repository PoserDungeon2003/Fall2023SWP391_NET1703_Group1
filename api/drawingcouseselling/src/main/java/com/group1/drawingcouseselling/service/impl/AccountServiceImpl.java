package com.group1.drawingcouseselling.service.impl;

import com.group1.drawingcouseselling.model.dto.AccountDto;
import com.group1.drawingcouseselling.model.entity.Account;
import com.group1.drawingcouseselling.model.enums.ERole;
import com.group1.drawingcouseselling.repository.AccountRepository;
import com.group1.drawingcouseselling.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
    @Override
    public Optional<AccountDto> searchAccountByID(BigDecimal id) {
        return Optional.of(accountRepository.findById(id).map(account -> account.convertEntityToDto(account)).orElseThrow());
    }

    @Override
    public Optional<AccountDto> searchAccountByEmail(String email) {
        return Optional.of( new Account().convertEntityToDto(accountRepository.findAccountByEmail(email).orElseThrow()));
    }

    @Override
    public Optional<Account> searchAccountByMail(String email) {
        return Optional.of(accountRepository.findAccountByEmail(email).orElseThrow());
    }
    @Override
    public List<AccountDto> searchAccountsByRoles(ERole userRole, Integer page){
        Page<Account> pages = accountRepository.findAccountByRoles(userRole,PageRequest.of(page-1,10));
        return pages.stream().map(account -> new Account().convertEntityToDto(account)).toList();
    }

    @Override
    public Account registerAccount(AccountDto account) {
        Account acc = new Account();
        acc.covertDtoToEntity(account);
        return accountRepository.save(acc);
    }

    @Override
    public AccountDto registerAccountV2(AccountDto account) {
        Account acc = new Account();
        acc = acc.covertDtoToEntity(account);
        accountRepository.save(acc);
        return account;
    }
}
